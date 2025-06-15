"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavProps {
    isCollapsed: boolean
    links: {
        title: string
        icon: LucideIcon
        href: string
    }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
    const pathname = usePathname()

    return (
        <TooltipProvider>
            <div
                data-collapsed={isCollapsed}
                className="group flex flex-col gap-1 py-2 data-[collapsed=true]:py-2"
            >
                <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                    {links.map((link, index) =>
                        isCollapsed ? (
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                                            pathname === link.href && "bg-accent text-accent-foreground"
                                        )}
                                    >
                                        <link.icon className="h-5 w-5" />
                                        <span className="sr-only">{link.title}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="flex items-center gap-4">
                                    {link.title}
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <Link
                                key={index}
                                href={link.href}
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                    pathname === link.href && "bg-accent text-accent-foreground"
                                )}
                            >
                                <link.icon className="mr-2 h-5 w-5" />
                                <span>{link.title}</span>
                            </Link>
                        )
                    )}
                </nav>
            </div>
        </TooltipProvider>
    )
}