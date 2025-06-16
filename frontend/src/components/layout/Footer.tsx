import Link from "next/link";
import { SiBmw } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="w-full bg-zinc-950 text-gray-400 py-6">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <div className="flex items-center gap-2">
                    <SiBmw className="h-6 w-6" />
                    <span className="font-bold text-white">BMW Care</span>
                </div>
                <p className="text-sm">
                    © {new Date().getFullYear()} BMW Care. Todos os direitos reservados.
                </p>
                <nav className="flex gap-4 sm:gap-6">
                    <Link href="#sobre" className="text-sm hover:underline underline-offset-4">Sobre</Link>
                    <Link href="#equipe" className="text-sm hover:underline underline-offset-4">Equipe</Link>
                    <Link href="/authpage" className="text-sm hover:underline underline-offset-4">Login</Link>
                </nav>
            </div>
        </footer>
    );
}