"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  BarChart2,
  Users,
  Settings,
  BookOpen,
  DollarSign,
  Bell,
  ChevronRight,
  Sparkles,
  LogOut,
  LayoutDashboard,
  Lightbulb,
  Palette,
  PenTool,
  FileText,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Shield,
  Target,
  Megaphone,
  Video,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { Button, Card, ScrollReveal } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";

// Demo data
const recentProjects = [
  {
    title: "Brand Identity Package",
    type: "Brand Development",
    status: "In Progress",
    date: "Jan 15, 2026",
    icon: Palette,
  },
  {
    title: "Product Launch Campaign",
    type: "Marketing",
    status: "Complete",
    date: "Dec 28, 2025",
    icon: Lightbulb,
  },
  {
    title: "Sales Representation Agreement",
    type: "Sales",
    status: "Pending",
    date: "Feb 1, 2026",
    icon: FileText,
  },
];

const quickStats = [
  { label: "Active Projects", value: "3", change: "+1", icon: Briefcase },
  { label: "Revenue Generated", value: "$12,450", change: "+18%", icon: DollarSign },
  { label: "Network Connections", value: "45", change: "+8", icon: Users },
  { label: "Resources Accessed", value: "28", change: "+5", icon: BookOpen },
];

const sidebarNav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "My Projects", icon: Briefcase },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "services", label: "Services", icon: Sparkles },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings },
];

const services = [
  { title: "Brand Development", description: "Logo design, visual identity, and market positioning", icon: Palette, status: "Active" },
  { title: "Business Formation", description: "LLC filing, entity structure, and compliance support", icon: Shield, status: "Available" },
  { title: "Sales Representation", description: "Direct sales, customer acquisition, and deal negotiation", icon: Target, status: "Active" },
  { title: "Marketing Strategy", description: "Market research, campaign planning, and execution", icon: Megaphone, status: "Available" },
  { title: "Content Creation", description: "Video production, photography, and social media content", icon: Video, status: "Available" },
  { title: "Creator Education", description: "Rights education, business fundamentals, and contracts", icon: GraduationCap, status: "Available" },
];

const analytics = [
  { label: "Page Views", value: "2,847", change: "+24%", period: "vs last month" },
  { label: "Inquiries", value: "18", change: "+33%", period: "vs last month" },
  { label: "Conversion Rate", value: "4.2%", change: "+0.8%", period: "vs last month" },
  { label: "Avg. Project Value", value: "$4,150", change: "+12%", period: "vs last month" },
];

const resources = [
  { title: "Brand Development Guide", description: "Build a distinctive brand identity that resonates with your audience.", icon: PenTool, category: "Branding" },
  { title: "Sales & Revenue Toolkit", description: "Strategies and templates for pitching, pricing, and closing deals.", icon: DollarSign, category: "Sales" },
  { title: "Rights & Contracts", description: "Understand your rights and navigate contracts with confidence.", icon: FileText, category: "Legal" },
  { title: "Business Fundamentals", description: "Essential business skills for independent creative entrepreneurs.", icon: Lightbulb, category: "Education" },
  { title: "Marketing Playbook", description: "Step-by-step marketing strategies for creative professionals.", icon: Megaphone, category: "Marketing" },
  { title: "Content Creation Guide", description: "Professional content production techniques and best practices.", icon: Video, category: "Content" },
];

// Tab content components
function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div>
        <h2 className="font-display text-xl mb-4">Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
            <Card key={stat.label} variant="bordered" padding="md" className="group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="font-display text-2xl mt-1">{stat.value}</p>
                  <p className="text-green-500 text-sm mt-1">{stat.change}</p>
                </div>
                <div className="p-2 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-void transition-all">
                  <stat.icon size={20} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-xl mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Request Service", icon: Sparkles },
            { label: "View Analytics", icon: BarChart2 },
            { label: "Browse Resources", icon: BookOpen },
            { label: "Account Settings", icon: Settings },
          ].map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-void-light border border-gold/10 hover:border-gold/30 hover:bg-void-lighter transition-all group"
            >
              <div className="p-3 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-void transition-all">
                <action.icon size={24} />
              </div>
              <span className="text-sm text-center text-gray-400 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="font-display text-xl mb-4">Recent Projects</h2>
        <Card variant="bordered" padding="none">
          <div className="divide-y divide-gold/10">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-void-lighter transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                    <project.icon className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-gray-500">{project.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-sm">{project.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      project.status === "Complete"
                        ? "bg-green-500/20 text-green-500"
                        : project.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gold/20 text-gold"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ProjectsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl">My Projects</h2>
        <Button size="sm">
          <Sparkles size={16} />
          Request New Project
        </Button>
      </div>
      <div className="space-y-4">
        {recentProjects.map((project, index) => (
          <Card key={index} variant="bordered" hover className="group">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <project.icon className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-lg group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{project.type}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} /> {project.date}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        project.status === "Complete"
                          ? "bg-green-500/20 text-green-500"
                          : project.status === "In Progress"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gold/20 text-gold"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-gold/10 transition-colors">
                <ArrowUpRight size={18} className="text-gray-500 group-hover:text-gold transition-colors" />
              </button>
            </div>
            {project.status === "In Progress" && (
              <div className="mt-4 pt-4 border-t border-gold/10">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <div className="w-full h-1.5 bg-void-lighter rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl">Analytics</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics.map((stat) => (
          <Card key={stat.label} variant="bordered" padding="md">
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="font-display text-2xl mt-1">{stat.value}</p>
            <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
              <TrendingUp size={14} /> {stat.change}
            </p>
            <p className="text-gray-600 text-xs mt-1">{stat.period}</p>
          </Card>
        ))}
      </div>

      {/* Performance Chart Placeholder */}
      <Card variant="bordered">
        <h3 className="font-display text-lg mb-4">Performance Over Time</h3>
        <div className="h-48 flex items-end justify-between gap-2 px-4">
          {[35, 52, 41, 68, 55, 73, 62, 80, 71, 88, 76, 92].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex-1 bg-gradient-to-t from-gold-dark to-gold rounded-t-sm"
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 px-4">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
            <span key={m} className="text-[10px] text-gray-600 flex-1 text-center">{m}</span>
          ))}
        </div>
      </Card>

      {/* Revenue Breakdown */}
      <Card variant="bordered">
        <h3 className="font-display text-lg mb-4">Revenue Sources</h3>
        <div className="space-y-4">
          {[
            { label: "Sales Commissions", pct: 65, amount: "$8,093" },
            { label: "Brand Partnerships", pct: 20, amount: "$2,490" },
            { label: "Content Licensing", pct: 10, amount: "$1,245" },
            { label: "Other", pct: 5, amount: "$622" },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-white font-medium">{item.amount}</span>
              </div>
              <div className="w-full h-2 bg-void-lighter rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-gold-dark to-gold-light rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ServicesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl">Available Services</h2>
        <span className="text-sm text-gray-500">Commission-only • No upfront costs</span>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.title} variant="bordered" hover className="group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-void transition-all flex-shrink-0">
                <service.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      service.status === "Active"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-gold/10 text-gold"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-2">{service.description}</p>
                <button className="mt-3 text-gold text-sm flex items-center gap-1 hover:underline">
                  {service.status === "Active" ? "View Details" : "Request Service"}{" "}
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ResourcesTab() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl">Resources & Learning</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <Card key={resource.title} variant="bordered" hover className="group">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-gold/10 text-gold">
                <resource.icon size={20} />
              </div>
              <div>
                <span className="text-xs text-gold/60 uppercase tracking-wider">
                  {resource.category}
                </span>
                <h3 className="font-display text-lg mt-1 group-hover:text-gold transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2">{resource.description}</p>
                <span className="text-gold/50 text-sm flex items-center gap-1 mt-3">
                  Coming Soon <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SettingsTab({ user }: { user: { email: string; name: string; type: string } | null }) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl">Account Settings</h2>

      {/* Profile */}
      <Card variant="bordered">
        <h3 className="font-display text-lg mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Display Name</label>
            <div className="px-4 py-3 rounded-lg bg-void border border-gold/20 text-gray-300">
              {user?.name || "Creator"}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <div className="px-4 py-3 rounded-lg bg-void border border-gold/20 text-gray-300">
              {user?.email || "—"}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Account Type</label>
            <div className="px-4 py-3 rounded-lg bg-void border border-gold/20 text-gray-300 capitalize">
              {user?.type || "—"} Account
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card variant="bordered">
        <h3 className="font-display text-lg mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { label: "Project updates", enabled: true },
            { label: "New resources available", enabled: true },
            { label: "Revenue reports", enabled: false },
            { label: "Community activity", enabled: false },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between py-2">
              <span className="text-gray-400 text-sm">{pref.label}</span>
              <div
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  pref.enabled ? "bg-gold" : "bg-void-lighter"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    pref.enabled ? "left-5" : "left-1"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card variant="bordered" className="border-red-500/20">
        <h3 className="font-display text-lg mb-2 text-red-400">Danger Zone</h3>
        <p className="text-gray-500 text-sm mb-4">
          Permanently delete your account and all associated data.
        </p>
        <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
          Delete Account
        </Button>
      </Card>
    </div>
  );
}

function PortalDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "projects":
        return <ProjectsTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "services":
        return <ServicesTab />;
      case "resources":
        return <ResourcesTab />;
      case "settings":
        return <SettingsTab user={user} />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-void">
      {/* Portal Header */}
      <header className="bg-[#0a0a0a] border-b border-gold/10 sticky top-0 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gold/10 rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu size={20} />
              </button>

              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="HLPFL" width={20} height={30} priority />
                <span className="font-display text-xl tracking-wider">
                  HLPFL<span className="text-gold">.</span>
                </span>
              </Link>
              <div className="h-6 w-px bg-gold/20 hidden md:block" />
              <div className="hidden md:block">
                <span className="text-gold uppercase tracking-widest text-xs">
                  Creative Portal
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 hidden sm:block">
                {user?.name || "Creator"}
              </span>
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">
                {user?.name?.charAt(0) || "C"}
              </div>
              <button
                onClick={logout}
                className="p-2 hover:bg-gold/10 rounded-lg transition-colors text-gray-400 hover:text-gold"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Notice Banner */}
      {user?.type === "demo" && (
        <div className="bg-gold/10 border-b border-gold/20">
          <div className="container-custom py-2">
            <p className="text-center text-sm text-gold">
              <span className="font-semibold">Demo Mode</span> —{" "}
              <Link href="/contact" className="underline hover:no-underline">
                Apply to get your real dashboard
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container-custom py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <Card variant="bordered" padding="sm">
                <nav className="space-y-1">
                  {sidebarNav.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left text-sm ${
                        activeTab === item.id
                          ? "bg-gold/20 text-gold"
                          : "hover:bg-void-lighter text-gray-400 hover:text-white"
                      }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>
          </div>

          {/* Sidebar - Mobile Overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 z-50 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed top-0 left-0 bottom-0 w-72 bg-[#0a0a0a] border-r border-gold/20 z-[60] lg:hidden"
                >
                  <div className="flex items-center justify-between p-4 border-b border-gold/20">
                    <span className="font-display text-lg tracking-wider">
                      Navigation
                    </span>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 hover:text-gold transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <nav className="p-4 space-y-1">
                    {sidebarNav.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
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
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Dashboard Area */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortalPage() {
  return (
    <AuthGuard>
      <PortalDashboard />
    </AuthGuard>
  );
}
