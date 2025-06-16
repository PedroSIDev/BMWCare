import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Linkedin, Github } from 'lucide-react';

// --- DADOS DA EQUIPE ---
const teamMembers = [
    {
        name: "Pedro Henrique",
        role: "Desenvolvedor Full-Stack",
        avatarUrl: "/images/avatars/hero-banner.png",
        linkedinUrl: "https://www.linkedin.com/in/devpedrotech/",
        githubUrl: "https://github.com/PedroSIDev",
    },
    {
        name: "Gabriel Giani",
        role: "Desenvolvedor Frontend",
        avatarUrl: "/images/avatars/#.jpg",
        linkedinUrl: "#",
        githubUrl: "#",
    },
    {
        name: "Guilherme Lemos",
        role: "Designer UI/UX",
        avatarUrl: "/images/avatars/#.jpg",
        linkedinUrl: "#",
        githubUrl: "#",
    },
    {
        name: "Alexandre Brinck",
        role: "Gerente de Projeto",
        avatarUrl: "/images/avatars/#.jpg",
        linkedinUrl: "#",
        githubUrl: "#",
    },
    {
        name: "Breno Morlin",
        role: "Engenheiro de DevOps",
        avatarUrl: "/images/avatars/#.jpg",
        linkedinUrl: "#",
        githubUrl: "#",
    },
    {
        name: "Bruno Gauy",
        role: "Analista de QA",
        avatarUrl: "/images/avatars/bruno.jpg",
        linkedinUrl: "#",
        githubUrl: "#",
    },
    {
        name: "Hebert Lamounier",
        role: "Desenvolvedor Full-Stack",
        avatarUrl: "/images/avatars/hebert.jpg",
        linkedinUrl: "#",
        githubUrl: "#",
    },
    {
        name: "Miguel Garcia",
        role: "Especialista em Banco de Dados",
        avatarUrl: "/images/avatars/miguel.jpg",
        linkedinUrl: "#",
        githubUrl: "#",
    },
];

export default function TeamSection() {
    return (
        <section id="members" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Conheça Nossa Equipe</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            As mentes dedicadas e talentosas por trás da concepção e desenvolvimento deste projeto.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-12 mt-12">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col items-center text-center">
                            <Avatar className="h-28 w-28 mb-4">
                                <AvatarImage src={member.avatarUrl} alt={`Foto de ${member.name}`} />
                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                            <div className="mt-4 flex gap-2">
                                <Link href={member.githubUrl} target="_blank">
                                    <Button variant="outline" size="icon">
                                        <Github className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href={member.linkedinUrl} target="_blank">
                                    <Button variant="outline" size="icon">
                                        <Linkedin className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}