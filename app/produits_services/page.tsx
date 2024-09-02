import About_us from "@/components/about-us";
import Akram_footer from "@/components/akram_footer";
import Collections from "@/components/collection-cards";
import ContactForm from "@/components/Contact-form";
import HeroSection from "@/components/Hero-section";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/Header";
import Product_section from "@/components/products-section";
import { url } from "inspector";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <header className="w-full flex items-center justify-center fixed z-20">
        <Header />
      </header>

      <section className="h-[70vh] w-full">
            <div className="h-full w-full  bg-center bg-cover bg-no-repeat flex items-center" style={{backgroundImage:`url('/images/hero-section-img.png')`}}>
                <div className="container">
                    <h2 className="text-white text-xl font-bold">Nos Produits et Services</h2>
                    <div className="mt-2">
                        <p className="text-white text-[16px] lg:w-[50%] leading-6">
                        Découvrez notre sélection de tissus, tapisseries, literie et voilages pour embellir et transformer votre intérieur avec style et confort.
                        </p>
                    </div>
                </div>
            </div>
      </section>

      <section className="py-3 mt-7">
            <div className="container grid grid-cols-1  md:grid-cols-2 items-center gap-8">
                <div>
                    <h3 className="text-2xl font-bold">Tissus</h3>
                    <p className="leading-6">
                    Découvrez notre large sélection de tissus, incluant des options pour salons marocains avec des motifs traditionnels et colorés, des tissus modernes parfaits pour canapés et chaises, ainsi que des tissus légers pour voilages qui apportent élégance et luminosité à vos espaces.
                    </p>
                </div>
                <div className="">
                    <div className="h-[500px] md:h-[600px] overflow-hidden rounded-[5px]">
                        <img src="/images/tissues.png" className="h-full w-full" />
                    </div>
                </div>
            </div>
      </section>

      <section className="py-3 mt-7">
            <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div className="md:order-1 order-2">
                    <div className="h-[500px] md:h-[600px] overflow-hidden rounded-[5px]">
                        <img src="/images/tapisserie.jpg" className="h-full w-full" />
                    </div>
                </div>
                <div className="md:order-2 order-1">
                    <h3 className="text-2xl font-bold">Tapisserie</h3>
                    <p className="leading-6">
                       Nos tissus de tapisserie sont idéaux pour recouvrir vos meubles avec style et durabilité. Nous proposons également des options décoratives pour les revêtements muraux et les coussins, apportant une touche raffinée et personnalisée à votre intérieur.
                    </p>
                </div>
            </div>
      </section>

      <section className="py-3 mt-7">
            <div className="container grid grid-cols-1  md:grid-cols-2 items-center gap-8">
                <div className="">
                    <h3 className="text-2xl font-bold">Literie</h3>
                    <p className="leading-6">
                    Nous offrons une gamme complète de produits pour une literie confortable, comprenant des sommiers, têtes de lit, matelas de haute qualité, ainsi que des canapés polyvalents et de la lingerie de lit douce pour assurer un sommeil réparateur et un espace de repos agréable.
                    </p>
                </div>
                <div className="">
                    <div className="h-[500px] md:h-[600px] overflow-hidden rounded-[5px]">
                        <img src="/images/literie.png" className="h-full w-full" />
                    </div>
                </div>
            </div>
      </section>

      <section className="py-3 mt-7 mb-5">
            <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div className="md:order-1 order-2">
                    <div className="h-[500px] md:h-[600px] overflow-hidden rounded-[5px]">
                        <img src="/images/voilage.png" className="h-full w-full" />
                    </div>
                </div>
                <div className="md:order-2 order-1">
                    <h3 className="text-2xl font-bold">Voilage</h3>
                    <p className="leading-6">
                    Nos voilages apportent une touche légère et élégante à vos fenêtres, avec des options décoratives et anti-UV pour préserver votre intimité tout en embellissant votre intérieur avec des tissus raffinés et fonctionnels.
                    </p>
                </div>
            </div>
      </section>

    <Akram_footer />

    </main>
  );
}
