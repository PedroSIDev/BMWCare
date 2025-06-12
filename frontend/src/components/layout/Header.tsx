import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { SVGProps } from "react"
import { CarIcon, HomeIcon, MicIcon, PenIcon, PhoneIcon } from "lucide-react"

const Header = () => {
    return (
        <div id="name">
            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link href="#" prefetch={false}>
                            <CarIcon className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <div className="grid gap-2 py-6">
                            <Link
                                href="#"
                                className="flex w-full items-center py-2 text-lg font-semibold text-black bg-transparent border border-white/30 backdrop-blur-md rounded-lg hover:bg-white/10 transition"
                                prefetch={false}
                            >
                                <CarIcon className="h-5 w-5 mr-2 text-white" />
                                Home
                            </Link>
                            <Link
                                href="#"
                                className="flex w-full items-center py-2 text-lg font-semibold text-black bg-transparent border border-white/30 backdrop-blur-md rounded-lg hover:bg-white/10 transition"
                                prefetch={false}
                            >
                                <CarIcon className="h-5 w-5 mr-2 text-white" />
                                Sobre
                            </Link>
                            <Link
                                href="#"
                                className="flex w-full items-center py-2 text-lg font-semibold text-black bg-transparent border border-white/30 backdrop-blur-md rounded-lg hover:bg-white/10 transition"
                                prefetch={false}
                            >
                                <CarIcon className="h-5 w-5 mr-2 text-white" />
                                Serviços
                            </Link>
                            <Link
                                href="#"
                                className="flex w-full items-center py-2 text-lg font-semibold text-black bg-transparent border border-white/30 backdrop-blur-md rounded-lg hover:bg-white/10 transition"
                                prefetch={false}
                            >
                                <CarIcon className="h-5 w-5 mr-2 text-white" />
                                Contato
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                    <CarIcon className="h-6 w-6 text-white" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <div className="flex w-full justify-center">
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList>
                            <NavigationMenuLink asChild>
                                <Link
                                    href="/"
                                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent border border-white/30 backdrop-blur-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                >
                                    <HomeIcon className="h-5 w-5 mr-2 text-white" />
                                    Home
                                </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <Link
                                    href="#"
                                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent border border-white/30 backdrop-blur-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                >
                                    <MicIcon className="h-5 w-5 mr-2 text-white" />
                                    Sobre
                                </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <Link
                                    href="#"
                                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent border border-white/30 backdrop-blur-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                >
                                    <PenIcon className="h-5 w-5 mr-2 text-white" />
                                    Serviços
                                </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <Link
                                    href="#"
                                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent border border-white/30 backdrop-blur-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                >
                                    <PhoneIcon className="h-5 w-5 mr-2 text-white" />
                                    Contato
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="ml-auto">
                    <Link href="/authpage" passHref>
                        <Button asChild>
                            <span className="text-white">Entrar</span>
                        </Button>
                    </Link>
                </div>
            </header>
        </div>
    )
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}

export default Header;