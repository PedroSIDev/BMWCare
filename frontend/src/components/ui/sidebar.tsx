"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

// Este componente não precisa mais de 'cva' ou 'collapsible' variants
// Ele será controlado pelo 'isCollapsed' state no layout pai.
const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { isCollapsed: boolean }>(
  ({ className, isCollapsed, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-screen flex-col bg-zinc-950 text-zinc-50 border-r border-zinc-800 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64", // Controla o tamanho aqui
        className
      )}
      {...props}
    />
  )
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex h-16 items-center justify-center p-4 border-b border-zinc-800", className)} {...props} />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 overflow-y-auto overflow-x-hidden", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-auto p-2 border-t border-zinc-800", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter }