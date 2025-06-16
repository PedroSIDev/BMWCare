'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('auth_token');
        router.push('/authpage');
    };

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <Car className="h-6 w-6 text-blue-500" />
                    <span className="font-bold">BMW Care</span>
                </Link>
                <Button onClick={handleLogout} variant="outline">
                    Sair
                </Button>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                {children}
            </main>
        </div>
    );
}