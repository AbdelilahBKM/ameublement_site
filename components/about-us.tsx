import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { JSX, SVGProps } from "react";

export default function About_us() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-orange-200 px-4 py-6 md:px-6 md:py-14">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-orange-500">
            <h1 className="capitalize text-3xl font-bold tracking-tighterr sm:text-4xl md:text-5xl">
              à propos de nous
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl">
              Découvrez notre histoire, nos valeurs et notre mission. Nous
              sommes passionnés par ce que nous faisons et nous nous engageons à
              offrir le meilleur à nos clients.
            </p>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-400">
                  Notre Expertise en Tissus et Tapisserie
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Notre équipe est composée de professionnels qualifiés et
                  passionnés par leur métier.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-orange-400">
                        Tapissiers expérimentés
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Notre Equipe comprend des tapissiers expérimentés qui
                        possèdent une solide expertise dans le domaine de la
                        tapisserie et de l&apos;ameublement. Ils ont une
                        connaissance approfondie des techniques de rembourrage,
                        de couture et de fabrication de meubles, acquise grâce à
                        des années d&apos;expérience dans le métier.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-orange-400">
                        Artisans qualifiés
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Nos tapissiers sont des artisans qualifiés qui
                        maîtrisent les compétences nécessaires pour travailler
                        avec différents types de matériaux, de tissus et de
                        meubles. Ils sont capables de réaliser des
                        restaurations, des réparations et des créations sur
                        mesure, en respectant les normes de qualité les plus
                        élevées.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-orange-400">
                        Créativité et sens du design
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Nos tapissiers allient créativité et sens du design. Ils
                        sont capables de comprendre les préférences et les
                        besoins des clients et de traduire leurs idées en des
                        pièces d&apos;ameublement uniques et esthétiquement
                        attrayantes. Ils peuvent recommander des choix de
                        tissus, de couleurs et de styles pour créer des pièces
                        harmonieuses qui correspondent aux goûts individuels de
                        chaque client.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-orange-400">
                        Travail sur mesure
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Notre Equipe est spécialisée dans la création de meubles
                        sur mesure, adaptés aux besoins spécifiques de chaque
                        client. Que ce soit pour un salon, canapé, un fauteuil,
                        une chaise, une chambre a coucher, un sommier, une tête
                        de lit, un voilage, un store ou tout autre type de
                        mobilier, nous travaillons en étroite collaboration avec
                        nos clients pour comprendre leurs attentes et créer des
                        pièces uniques qui répondent à leurs exigences.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-orange-400">
                        Service personnalisé
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        On offre un service personnalisé et attentif à chaque
                        client. On écoute attentivement les besoins et les
                        préférences de chaque client et on s&apos;assure de
                        fournir des solutions adaptées à leurs attentes. On est
                        disponible pour répondre aux questions, donner des
                        conseils et guider les clients tout au long du
                        processus.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-orange-400">
                        Souci du détail et qualité du travail
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        On accorde une grande attention aux détails et on
                        s&apos;efforce de fournir un travail de haute qualité.
                        Chaque étape du processus, du rembourrage à la finition,
                        est réalisée avec précision et minutie pour garantir un
                        résultat final impeccable.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24d lg:py-32g">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Témoignages
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ce que disent nos clients
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez ce que nos clients disent de la transformation de leur intérieur
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="bg-orange-100 p-6 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Leïla A.
                      </p>
                      <p className="text-sm text-muted-foreground">Marrakech</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground">
                  &quot;Une expérience exceptionnelle avec Akram Ameublement. Leur
                    large gamme de tissus et leur savoir-faire en tapisserie ont
                    donné un nouveau souffle à notre maison. Le tout avec un
                    service client impeccable. Merci pour cette belle
                    transformation !&quot;
                  </blockquote>
                </CardContent>
              </Card>
              <Card className="bg-orange-100 p-6 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium leading-none">
                      Fatima Z.
                      </p>
                      <p className="text-sm text-muted-foreground">
                      Marrakech
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground">
                  &quot;Nous avons fait appel à Akram Ameublement pour rénover
                    notre mobilier et les résultats sont magnifiques. Leur
                    collection de tissus est variée et de grande qualité, et la
                    tapisserie est parfaitement réalisée. Une entreprise fiable
                    et professionnelle !&quot;
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function BrainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
