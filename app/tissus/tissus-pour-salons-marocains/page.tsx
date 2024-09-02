import Akram_footer from "@/components/akram_footer";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/Header";
import Product_section from "@/components/products-section";


export default function TissusPourSalonsMarocains () {
    return (
        // <main className="flex min-h-screen flex-col items-center justify-between">
        <> 
            <header className="w-full flex items-center justify-center fixed z-20">
            <Header />
            </header>

            <section className="h-[40vh] w-full">
                <div className="h-full w-full  bg-center bg-cover bg-no-repeat flex items-center" style={{backgroundImage:`url('/images/hero-section-img.png')`}}>
                    <div className="container">

                        <div className="flex gap-2 items-center mt-8 md:mt-0">
                            <p className="text-white text-xl font-bold uppercase">Tissus</p>
                            <span className="text-white block">/</span>
                            <p className="capitalize text-white text-2xl ">Tissus pour Salons Marocains</p>
                        </div>
                        <div className="mt-2">
                            {/* <p className="text-white text-[16px] lg:w-[50%] leading-6">
                            Découvrez notre sélection de tissus, tapisseries, literie et voilages pour embellir et transformer votre intérieur avec style et confort.
                            </p> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8">
                 {/* <h3 className="text-center font-bold text-xl mt-5">Découvrez Nos Produits</h3> */}
                 <div className="mt-5">
                     <Product_section />
                 </div>
            </section>


            <Akram_footer />
        {/* </main> */}
    </>
    )
}