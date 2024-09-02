import Image from "next/image"
export default function Collections() {
    return (
        <section className="bg-background py-12 md:py-20">
            <div className="container">
                <div className="mb-8 text-center md:mb-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Découvrez notre collection</h2>
                    <p className="mt-2 text-muted-foreground md:text-lg">
                        fusion parfaite entre tradition marocaine et design modern.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="group relative overflow-hidden rounded-lg">
                        <Image
                            src="/images/tissues.png"
                            alt="Tissus"
                            width={400}
                            height={300}
                            className="w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                            <h3 className="text-lg font-semibold text-white">Tissus</h3>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-lg">
                        <Image
                            src="/images/salon.png"
                            alt="Salons"
                            width={400}
                            height={300}
                            className="w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                            <h3 className="text-lg font-semibold text-white">Salons</h3>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-lg">
                        <Image
                            src="/images/literie.png"
                            alt="Literie"
                            width={400}
                            height={300}
                            className="w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                            <h3 className="text-lg font-semibold text-white">Literie</h3>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-lg">
                        <Image
                            src="/images/voilage.png"
                            alt="voilage"   
                            width={400}
                            height={300}
                            className="w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                            <h3 className="text-lg font-semibold text-white">Voilage</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}