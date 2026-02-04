"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Music,
  BarChart2,
  Users,
  Settings,
  Upload,
  DollarSign,
  Calendar,
  Bell,
  ChevronRight,
  Play,
  ExternalLink,
} from "lucide-react";
import { Button, Card, ScrollReveal } from "@/components/ui";

// Demo data for the portal
const recentReleases = [
  {
    title: "Summer Vibes EP",
    streams: "12.5K",
    status: "Live",
    date: "Jan 15, 2026",
  },
  {
    title: "Midnight Dreams",
    streams: "8.2K",
    status: "Live",
    date: "Dec 28, 2025",
  },
  {
    title: "New Single",
    streams: "—",
    status: "Processing",
    date: "Feb 1, 2026",
  },
];

const quickStats = [
  { label: "Total Streams", value: "45.2K", change: "+12%", icon: Play },
  { label: "Revenue", value: "$1,247", change: "+8%", icon: DollarSign },
  { label: "Followers", value: "2.1K", change: "+24%", icon: Users },
  { label: "Releases", value: "7", change: "+1", icon: Music },
];

const quickActions = [
  { label: "Upload New Release", icon: Upload, href: "#upload" },
  { label: "View Analytics", icon: BarChart2, href: "#analytics" },
  { label: "Schedule Release", icon: Calendar, href: "#schedule" },
  { label: "Account Settings", icon: Settings, href: "#settings" },
];

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-void">
      {/* Portal Header */}
      <section className="bg-void-light border-b border-gold/10">
        <div className="container-custom py-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-gold uppercase tracking-widest text-sm">
                  Creative Entrepreneur Portal
                </span>
                <h1 className="font-display text-3xl md:text-4xl mt-2">
                  Welcome Back, <span className="text-gradient">Creator</span>
                </h1>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Bell size={18} />
                  Notifications
                </Button>
                <Button size="sm">
                  <Upload size={18} />
                  New Release
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Demo Notice Banner */}
      <div className="bg-gold/10 border-b border-gold/20">
        <div className="container-custom py-3">
          <p className="text-center text-sm text-gold">
            <span className="font-semibold">Demo Mode:</span> This is a preview
            of the Creative Entrepreneur Portal.{" "}
            <a href="#" className="underline hover:no-underline">
              Sign up to access your real dashboard →
            </a>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <ScrollReveal>
              <Card variant="bordered" padding="sm">
                <nav className="space-y-1">
                  {[
                    { id: "overview", label: "Overview", icon: BarChart2 },
                    { id: "releases", label: "My Releases", icon: Music },
                    { id: "analytics", label: "Analytics", icon: BarChart2 },
                    { id: "earnings", label: "Earnings", icon: DollarSign },
                    { id: "community", label: "Community", icon: Users },
                    { id: "settings", label: "Settings", icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                        activeTab === item.id
                          ? "bg-gold/20 text-gold"
                          : "hover:bg-void-lighter text-gray-400 hover:text-white"
                      }`}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </ScrollReveal>
          </div>

          {/* Main Dashboard Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Stats */}
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat, index) => (
                  <Card
                    key={stat.label}
                    variant="bordered"
                    padding="md"
                    className="group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="font-display text-2xl mt-1">
                          {stat.value}
                        </p>
                        <p className="text-green-500 text-sm mt-1">
                          {stat.change}
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-void transition-all">
                        <stat.icon size={20} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollReveal>

            {/* Quick Actions */}
            <ScrollReveal delay={0.2}>
              <h2 className="font-display text-xl mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="flex flex-col items-center gap-3 p-6 rounded-xl bg-void-light border border-gold/10 hover:border-gold/30 hover:bg-void-lighter transition-all group"
                  >
                    <div className="p-3 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-void transition-all">
                      <action.icon size={24} />
                    </div>
                    <span className="text-sm text-center text-gray-400 group-hover:text-white transition-colors">
                      {action.label}
                    </span>
                  </a>
                ))}
              </div>
            </ScrollReveal>

            {/* Recent Releases */}
            <ScrollReveal delay={0.3}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl">Recent Releases</h2>
                <a
                  href="#releases"
                  className="text-gold text-sm hover:underline flex items-center gap-1"
                >
                  View All <ChevronRight size={16} />
                </a>
              </div>
              <Card variant="bordered" padding="none">
                <div className="divide-y divide-gold/10">
                  {recentReleases.map((release, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 hover:bg-void-lighter transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                          <Music className="text-gold" size={20} />
                        </div>
                        <div>
                          <p className="font-medium">{release.title}</p>
                          <p className="text-sm text-gray-500">{release.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Streams</p>
                          <p className="font-medium">{release.streams}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            release.status === "Live"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-gold/20 text-gold"
                          }`}
                        >
                          {release.status}
                        </span>
                        <button className="p-2 hover:bg-gold/10 rounded-lg transition-colors">
                          <ExternalLink size={18} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>

            {/* Resources Section */}
            <ScrollReveal delay={0.4}>
              <h2 className="font-display text-xl mb-4">Resources & Learning</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card variant="bordered" hover className="group">
                  <h3 className="font-display text-lg mb-2 group-hover:text-gold transition-colors">
                    Distribution Guide
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Learn how to get your music on all major streaming platforms.
                  </p>
                  <a
                    href="#"
                    className="text-gold text-sm flex items-center gap-1 hover:underline"
                  >
                    Read Guide <ChevronRight size={16} />
                  </a>
                </Card>
                <Card variant="bordered" hover className="group">
                  <h3 className="font-display text-lg mb-2 group-hover:text-gold transition-colors">
                    Marketing Toolkit
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Templates, strategies, and tools to promote your releases.
                  </p>
                  <a
                    href="#"
                    className="text-gold text-sm flex items-center gap-1 hover:underline"
                  >
                    Access Toolkit <ChevronRight size={16} />
                  </a>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
