'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { SiBmw } from 'react-icons/si';

const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "Sobre" },
    { href: "#members", label: "Membros" },
    { href: "#contact", label: "Contato" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                isScrolled ? "border-b border-border/40 bg-background/95 backdrop-blur-sm" : "bg-transparent"
            )}
        >
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* --- LOGO --- */}
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
                    <SiBmw className="h-6 w-6" />
                    <span>BMW Care</span>
                </Link>

                {/* --- NAVEGAÇÃO DESKTOP --- */}
                <nav className="hidden items-center gap-6 text-sm md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "font-medium text-gray-300 transition-colors hover:text-white",
                                pathname === link.href && "text-white underline underline-offset-4"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* --- BOTÕES DE AÇÃO (DIREITA) --- */}
                <div className="hidden items-center gap-4 md:flex">
                    <Link href="/authpage">
                        <Button variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white">
                            Entrar
                        </Button>
                    </Link>
                    <Link href="#contact">
                        <Button className="bg-blue-600 hover:bg-blue-700">Agendar Serviço</Button>
                    </Link>
                </div>

                {/* --- MENU MOBILE (SHEET) --- */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Abrir menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-3/4 bg-zinc-950 text-white border-zinc-800">
                            <div className="flex items-center gap-2 font-bold text-lg mb-8">
                                <SiBmw className="h-6 w-6" />
                                <span>BMW Care</span>
                            </div>
                            <nav className="grid gap-4 text-lg">
                                {navLinks.map((link) => (
                                    <Link key={link.href} href={link.href} className="font-medium text-gray-300 transition-colors hover:text-white">
                                        {link.label}
                                    </Link>
                                ))}
                                <hr className="my-4 border-zinc-800" />
                                <Link href="/authpage">
                                    <Button variant="outline" className="w-full bg-transparent">Entrar</Button>
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}