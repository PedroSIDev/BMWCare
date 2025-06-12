/* eslint-disable @next/next/no-img-element */
import Header from '@/components/layout/Header';

export default function HomePage() {
  return (
    <section
      id="home-page-section"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col overflow-x-hidden"
    >
      <Header />
      <div
        id="home-page-content"
        className="flex-grow flex items-center justify-center"
      >
        <div className="flex flex-col md:flex-row items-center w-full max-w-6xl px-4 md:px-8 lg:px-16 xl:px-24 py-8 md:py-16 gap-8">

          {/* Texto à esquerda */}
          <div className="flex-1 text-white md:pr-12 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 leading-tight drop-shadow-lg uppercase">
              Monitoramento e manutenção de veículos
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light drop-shadow-md">
              Acompanhe revisões, registre históricos, agende serviços e receba
              alertas automáticos para manter sua frota sempre em dia.
            </p>
          </div>

          {/* Imagem à direita */}
          <div className="flex-1 flex flex-col items-center md:items-end justify-center md:justify-end">
            <img
              src="https://wallpapers.com/images/hd/black-b-m-w-m4-coupe-side-view-wp9zlefj29dfjc4s.jpg"
              alt="Carro"
              className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full h-auto object-contain drop-shadow-2xl"
            />
            <span className="mt-2 text-xs text-gray-300 italic">
              BMW M4 Coupé
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}