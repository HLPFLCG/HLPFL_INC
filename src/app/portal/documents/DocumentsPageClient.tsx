'use client'

import { useState, useEffect, useRef } from 'react'
import { createSupabaseBrowserClient } from '@/lib/portal/supabase-client'
import { usePortal } from '../PortalLayoutClient'

interface FileDoc {
  id: string
  name: string
  file_type: string | null
  file_size: number | null
  visibility: string
  uploaded_by: string
  storage_path?: string
  created_at: string
  projects: { title: string } | null
}

function formatBytes(bytes: number | null) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function DocumentsPageClient() {
  const { user } = usePortal()
  const [docs, setDocs] = useState<FileDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createSupabaseBrowserClient()

  async function load() {
    const { data } = await supabase
      .from('documents')
      .select('id,name,file_type,file_size,visibility,uploaded_by,created_at,projects(title)')
      .order('created_at', { ascending: false })
    setDocs((data as unknown as FileDoc[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    if (user) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploadError('')
    setUploading(true)

    const ext = file.name.split('.').pop()
    const path = `${user.id}/${Date.now()}-${file.name.replace(/[^a-z0-9.\-_]/gi, '_')}`

    const { error: storageErr } = await supabase.storage
      .from('documents')
      .upload(path, file, { contentType: file.type })

    if (storageErr) {
      setUploadError(storageErr.message)
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
      return
    }

    const { error: dbErr } = await supabase.from('documents').insert({
      customer_id: user.id,
      name: file.name,
      storage_path: path,
      file_type: file.type || ext || null,
      file_size: file.size,
      visibility: 'client',
      uploaded_by: 'customer',
    })

    if (dbErr) {
      setUploadError(dbErr.message)
    } else {
      await load()
    }

    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleDownload(doc: FileDoc) {
    setDownloadingId(doc.id)
    const { data } = await supabase.storage
      .from('documents')
      .createSignedUrl(doc.storage_path ?? doc.name, 3600)

    if (data?.signedUrl) {
      const a = window.document.createElement('a')
      a.href = data.signedUrl
      a.download = doc.name
      a.click()
    }
    setDownloadingId(null)
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
            Files
          </p>
          <h1 className="font-display text-3xl tracking-wider text-white">
            Documents
          </h1>
        </div>
        <label className="bg-gold hover:bg-gold-light text-white text-xs font-semibold px-4 py-2.5 tracking-wide transition-colors cursor-pointer">
          {uploading ? 'Uploading…' : '+ Upload'}
          <input
            ref={fileRef}
            type="file"
            className="sr-only"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {uploadError && (
        <p className="text-red-400 text-sm border border-red-400/20 bg-red-400/5 px-4 py-3 mb-6">
          {uploadError}
        </p>
      )}

      {loading ? (
        <p className="text-white/30 text-sm">Loading…</p>
      ) : docs.length === 0 ? (
        <div className="border border-void-lighter bg-void-light p-8 text-center">
          <p className="text-white/30 text-sm">No documents yet.</p>
          <p className="text-white/20 text-xs mt-1">
            Upload a file using the button above, or ask HLPFL to share documents
            with you.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="border border-void-lighter bg-void-light px-5 py-4 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <p className="text-white text-sm font-medium">{doc.name}</p>
                <p className="text-white/35 text-xs mt-0.5">
                  {doc.projects?.title ? `${doc.projects.title} · ` : ''}
                  {formatBytes(doc.file_size)} ·{' '}
                  {new Date(doc.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDownload(doc)}
                disabled={downloadingId === doc.id}
                className="text-xs text-gold/60 hover:text-gold border border-gold/20 hover:border-gold/40 px-3 py-1.5 transition-colors disabled:opacity-40"
              >
                {downloadingId === doc.id ? 'Preparing…' : 'Download'}
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-white/20 text-xs mt-6">
        Files are stored securely. Download links expire after 1 hour.
      </p>
    </div>
  )
}
