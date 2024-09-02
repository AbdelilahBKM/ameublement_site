import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-8 md:py-16 md:px-6 lg:py-20">
      <PackageX
        className="w-16 h-16 mb-4 text-muted-foreground"
        aria-hidden="true"
      />
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">
        404
      </h1>
      <h2 className="text-2xl font-semibold tracking-tight mb-4">
        Produit Introuvable
      </h2>
      <p className="text-muted-foreground text-center max-w-[600px] mb-8">
        Nous n&apos;avons pas pu trouver le produit que vous recherchez.
      </p>
      <Button asChild>
        <Link href="/">Retour à L&apos;Accueil</Link>
      </Button>
    </div>
  );
}
