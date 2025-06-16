"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Car, LayoutDashboard, Menu, PanelLeftClose, PanelLeftOpen, Users, Wrench } from "lucide-react"

import { Nav } from "@/components/nav"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"
import { SiBmw } from 'react-icons/si';

import { AdminStatsProvider } from "@/context/AdminStatsContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const router = useRouter()

    const handleLogout = () => {
        Cookies.remove('auth_token')
        router.push('/authpage')
    }

    const navItems = [
        { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, variant: "default" as const },
        { title: "Usuários", href: "/admin/users", icon: Users, variant: "ghost" as const },
        { title: "Veículos", href: "/admin/vehicles", icon: Car, variant: "ghost" as const },
        { title: "Manutenções", href: "/admin/maintenances", icon: Wrench, variant: "ghost" as const },
    ]

    return (
        <AdminStatsProvider>
            <div className="flex h-screen w-full bg-background">
                {/* --- SIDEBAR PARA DESKTOP --- */}
                <Sidebar isCollapsed={isCollapsed} className="hidden md:flex">
                    <SidebarHeader className="flex items-center justify-between px-3">
                        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                            <SiBmw className="h-6 w-6" />
                            {!isCollapsed && <span>Painel Admin</span>}
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsCollapsed(!isCollapsed)}>
                            {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
                            <span className="sr-only">Toggle Sidebar</span>
                        </Button>
                    </SidebarHeader>

                    <SidebarContent>
                        <Nav isCollapsed={isCollapsed} links={navItems} />
                    </SidebarContent>
                    <SidebarFooter>
                        <NavUser onLogout={handleLogout} />
                    </SidebarFooter>
                </Sidebar>

                <div className="flex flex-1 flex-col">
                    {/* --- CABEÇALHO DO CONTEÚDO PRINCIPAL --- */}
                    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 md:h-16">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Abrir menu de navegação</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col p-0">
                                <div className="flex h-14 items-center border-b px-4">
                                    <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                                        <SiBmw className="h-6 w-6" />
                                        <span>Painel Admin</span>
                                    </Link>
                                </div>
                                <div className="flex-1 overflow-auto py-4">
                                    <Nav isCollapsed={false} links={navItems} />
                                </div>
                                <div className="mt-auto border-t p-2">
                                    <NavUser onLogout={handleLogout} />
                                </div>
                            </SheetContent>
                        </Sheet>

                        <div className="w-full flex-1">
                            <DynamicBreadcrumb />
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </AdminStatsProvider>
    )
}