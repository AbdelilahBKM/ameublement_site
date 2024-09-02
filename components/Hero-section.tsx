import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"


export default function Component() {
    return (
        <section className="relative w-full">
            <Image
                src="/images/hero-section-img.png"
                alt="Marrakech Furniture"
                width={1440}
                height={713}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/15"/>
            <div className="container mx-auto flex h-[80vh] flex-col items-end justify-center px-4 py-12 md:px-6 lg:py-20">
                <div className="max-w-2xl rounded-lg bg-orange-100 p-6 backdrop-blur-sm sm:p-8 md:p-10">
                    <h2 className="mb-2 text-sm font-medium text-primary">
                        Ameublement à Marrakech
                        </h2>
                    <h1 className="mb-4 text-3xl font-bold tracking-tight text-orange-400 sm:text-4xl md:text-5xl">
                        Découvrez l&apos;Élégance Marocaine
                    </h1>
                    <p className="mb-6 text-primary md:text-lg">
                        Plongez dans l&apos;univers du mobilier marocain authentique et raffiné. Découvrez notre collection exclusive,
                        mélange subtil de tradition et de modernité.
                    </p>
                    <Link href={"/#contact"}>
                    <Button className="inline-flex rounded-none border-none items-center justify-center bg-orange-500 px-6 py-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-orange-500/90 focus:outline-none focus:ring-1 focus:ring-primary/50">
                        Contactez Nous
                    </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}