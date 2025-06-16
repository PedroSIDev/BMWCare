/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import TeamSection from '@/components/sections/TeamSection';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        {/* 1. Vídeo de Fundo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover z-0"
          src="/videos/bmw.mp4" 
        >
          Seu navegador não suporta a tag de vídeo.
        </video>

        {/* 2. Sobreposição (Overlay) para Contraste */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* 3. Conteúdo da Página */}
        <div className="relative z-20 flex h-full flex-col">
          <Header />
          {/* Conteúdo Centralizado */}
          <main className="flex flex-grow flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-4xl md:text-6xl font-bold uppercase tracking-wider drop-shadow-lg animate-fade-in-down">
              Excelência em Cada Detalhe
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-200 drop-shadow-md animate-fade-in-up">
              Gerenciamento de ponta para sua frota de veículos. Precisão, performance e tranquilidade ao seu alcance.
            </p>

            {/* Botões de Ação */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/authpage">
                <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105">
                  Acessar Painel
                </button>
              </Link>
              <Link href="#about">
                <button className="px-8 py-3 bg-transparent border-2 border-white border-opacity-50 text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-black transition-colors duration-300">
                  Saber Mais
                </button>
              </Link>
            </div>
          </main>
        </div>
      </section>
      <AboutSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </>
  );
}