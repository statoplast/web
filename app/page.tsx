import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <div className="bg-black text-white overflow-hidden font-sans antialiased">
      <SiteHeader variant="transparent" />

      <main className="relative flex flex-col md:flex-row h-[100dvh] w-full">
        <h1 className="sr-only">Statoplast | Moderna Arhitektura i Industrijska obrada metala</h1>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/50 text-xs font-bold tracking-widest animate-pulse-slow">
          ILI
        </div>

        <Link
          href="/pivot-vrata"
          className="group relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden flex flex-col justify-end p-6 pb-10 sm:p-10 lg:p-20 text-left cursor-pointer border-b md:border-b-0 md:border-r border-white/10"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/80 transition-colors duration-700"></div>

          <div className="relative z-10 transform md:group-hover:-translate-y-4 transition-transform duration-700 ease-out">
            <div className="flex items-center space-x-2 mb-2 md:mb-4">
              <div className="h-[1px] w-6 bg-white/50"></div>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/70">
                PREMIUM DIZAJN & STOLARIJA
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-light mb-2 md:mb-4 tracking-tight leading-tight">
              MODERNA
              <br />
              <span className="font-bold">ARHITEKTURA.</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-zinc-400 mb-4 md:mb-8 max-w-sm sm:max-w-md leading-relaxed">
              Pivot vrata, bioklimatske pergole i napredni sustavi ALU stolarije. Spoj vrhunskog
              inženjeringa i minimalističke estetike.
            </p>
            <div className="inline-flex items-center space-x-4">
              <span className="bg-white text-black px-6 py-2.5 md:px-8 md:py-3 text-xs font-bold tracking-widest group-hover:bg-zinc-200 transition-colors">
                ISTRAŽITE
              </span>
              <span className="text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                →
              </span>
            </div>
          </div>
        </Link>

        <Link
          href="/plastifikacija-metala"
          className="group relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden flex flex-col justify-end p-6 pb-12 sm:p-10 lg:p-20 text-left cursor-pointer"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            style={{ backgroundImage: "url('/slike/industrija.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 group-hover:from-black/80 transition-colors duration-700"></div>

          <div className="relative z-10 transform md:group-hover:-translate-y-4 transition-transform duration-700 ease-out">
            <div className="flex items-center space-x-2 mb-2 md:mb-4">
              <div className="h-[1px] w-6 bg-blue-500/50"></div>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-400">
                INDUSTRIJSKI SEKTOR I PROIZVODNJA
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-light mb-2 md:mb-4 tracking-tight text-zinc-300 leading-tight">
              METALNA
              <br />
              <span className="font-bold text-white">INDUSTRIJA.</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-zinc-400 mb-4 md:mb-8 max-w-sm sm:max-w-md leading-relaxed">
              Plastifikacija metala, CNC obrada i serijska proizvodnja elektro ormara. Preciznost i
              kapacitet za velike projekte.
            </p>
            <div className="inline-flex items-center space-x-4">
              <span className="border border-white/30 text-white px-6 py-2.5 md:px-8 md:py-3 text-xs font-bold tracking-widest group-hover:bg-white group-hover:text-black transition-all">
                POGLEDAJTE USLUGE
              </span>
              <span className="text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                →
              </span>
            </div>
          </div>
        </Link>
      </main>
    </div>
  );
}
