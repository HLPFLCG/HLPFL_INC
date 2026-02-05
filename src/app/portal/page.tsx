"use client";

import { useState } from "react";
import Link from "next/link";
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
  ExternalLink,
  LogOut,
  LayoutDashboard,
  Lightbulb,
  Palette,
  PenTool,
  FileText,
} from "lucide-react";
import { Button, Card, ScrollReveal } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";

// Demo data for the portal - generic creative entrepreneur data
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

const quickActions = [
  { label: "Request Service", icon: Sparkles, href: "#services" },
  { label: "View Progress", icon: BarChart2, href: "#progress" },
  { label: "Browse Resources", icon: BookOpen, href: "#resources" },
  { label: "Account Settings", icon: Settings, href: "#settings" },
];

const sidebarNav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "My Projects", icon: Briefcase },
  { id: "services", label: "Services", icon: Sparkles },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "community", label: "Community", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

function PortalDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-void">
      {/* Portal Header */}
      <section className="bg-void-light border-b border-gold/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo & Title */}
            <div className="flex items-center gap-6">
              <Link href="/" className="font-display text-2xl tracking-wider">
                HLPFL<span className="text-gold">.</span>
              </Link>
              <div className="h-8 w-px bg-gold/20 hidden md:block" />
              <div>
                <span className="text-gold uppercase tracking-widest text-xs">
                  Creative Entrepreneur Portal
                </span>
                <h1 className="font-display text-xl md:text-2xl">
                  Welcome, <span className="text-gradient">{user?.name || "Creator"}</span>
                </h1>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell size={16} />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Notice Banner */}
      {user?.type === "demo" && (
        <div className="bg-gold/10 border-b border-gold/20">
          <div className="container-custom py-3">
            <p className="text-center text-sm text-gold">
              <span className="font-semibold">Demo Mode:</span> This is a preview
              of the Creative Entrepreneur Portal.{" "}
              <Link href="/contact" className="underline hover:no-underline">
                Apply to get your real dashboard →
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <ScrollReveal>
              <Card variant="bordered" padding="sm">
                <nav className="space-y-1">
                  {sidebarNav.map((item) => (
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
                {quickStats.map((stat) => (
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

            {/* Recent Projects */}
            <ScrollReveal delay={0.3}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl">Recent Projects</h2>
                <a
                  href="#projects"
                  className="text-gold text-sm hover:underline flex items-center gap-1"
                >
                  View All <ChevronRight size={16} />
                </a>
              </div>
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
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gold/10 text-gold">
                      <PenTool size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-2 group-hover:text-gold transition-colors">
                        Brand Development Guide
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Learn how to build a distinctive brand identity that resonates with your audience.
                      </p>
                      <span
                        className="text-gold/50 text-sm flex items-center gap-1"
                      >
                        Coming Soon <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </Card>
                <Card variant="bordered" hover className="group">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gold/10 text-gold">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-2 group-hover:text-gold transition-colors">
                        Sales & Revenue Toolkit
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Strategies and templates for pitching, pricing, and closing deals.
                      </p>
                      <span
                        className="text-gold/50 text-sm flex items-center gap-1"
                      >
                        Coming Soon <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </Card>
                <Card variant="bordered" hover className="group">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gold/10 text-gold">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-2 group-hover:text-gold transition-colors">
                        Rights & Contracts
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Understand your rights and navigate contracts with confidence.
                      </p>
                      <span
                        className="text-gold/50 text-sm flex items-center gap-1"
                      >
                        Coming Soon <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </Card>
                <Card variant="bordered" hover className="group">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gold/10 text-gold">
                      <Lightbulb size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-2 group-hover:text-gold transition-colors">
                        Business Fundamentals
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Essential business skills for independent creative entrepreneurs.
                      </p>
                      <span
                        className="text-gold/50 text-sm flex items-center gap-1"
                      >
                        Coming Soon <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
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
