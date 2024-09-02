import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Produits } from "@/types/Produit";
import React from "react";
import { DOMAIN_NAME } from "@/utils/app_variables";
import { Skeleton } from "./ui/skeleton";
import { calculateDateDifference, isDateNew } from "@/utils/date";
import { Badge } from "./ui/badge";
import ProductCard from "./ui/ProductCard";

interface ComponentProps {
  produits: Produits[];
}

const ProduitsEnPromo: React.FC<ComponentProps> = ({ produits }) => {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mb-8 md:mb-10 lg:mb-12 flex justify-center">
          <h2 className="text-xl font-bold tracking-tight lg:text-2xl text-slate-700">
            Produits en Promotion!
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {produits.map((product) => (
            <ProductCard product={product} key={product.id}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProduitsEnPromo;
