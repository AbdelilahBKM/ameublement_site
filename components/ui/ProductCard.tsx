import { Produits } from "@/types/Produit";
import { Badge } from "./badge";
import { calculateDateDifference, isDateNew } from "@/utils/date";
import Link from "next/link";
import Image from "next/image";
import { DOMAIN_NAME } from "@/utils/app_variables";
import { Button } from "./button";

const ProductCard: React.FC<{ product: Produits }> = ({ product }) => {
  return (
    <div
      key={product.id}
      className="rounded-lg bg-card p-4 shadow-sm transition-all hover:shadow-md"
    >
      
      <Link
        href={"/produits/" + product.id}
        className="group relative block overflow-hidden rounded-lg"
        prefetch={false}
      >
        <div>
          {isDateNew(product.created_at.toString()) && (
            <Badge
              variant={"secondary"}
              className="text-sm text-orange-500 absolute top-2 right-2 z-10"
            >
              Nouveau
            </Badge>
          )}
          <Image
            src={`${DOMAIN_NAME}/storage/images/${product.image_produit}`}
            alt={product.nom_produit}
            width={400}
            height={400}
            className="h-60 w-full object-cover transition-all group-hover:scale-105"
            style={{ aspectRatio: "400/400", objectFit: "cover" }}
          />
        </div>
        <div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-black/75 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="sm"
            className="w-full bg-orange-500 text-white hover:bg-orange-700"
          >
            Voir le produit
          </Button>
        </div>
      </Link>
      <div className="mt-4">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">{product.nom_produit}</h3>
          {product.en_promotion == true && (
            <Badge variant={"secondary"} className="text-red-400 line-through">
              {product.remise}%
            </Badge>
          )}
        </div>
        <div className="text-md">{product.description}</div>
        <div className="mt-2 flex items-center gap-2 mb-3">
          <div className="text-base font-semibold text-primary">
            {(product.prix * (1 - product.remise / 100)).toFixed(2)} MAD
          </div>
          {product.en_promotion ? <div className="text-sm text-muted-foreground line-through">
            {product.prix} MAD
          </div> : null}
        </div>
        {product.en_promotion === true && (
        <div className="mb-5 flex items-center justify-start">
          <Badge
            variant={"outline"}
            className="text-sm font-thin text-slate-700"
          >
            il reste
            <span className="px-1 text-red-500">
              {calculateDateDifference(product.date_limit_promotion!) + " "}
            </span>
            jours
          </Badge>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductCard;
