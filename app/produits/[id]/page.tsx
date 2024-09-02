"use client";
import { Produits } from "@/types/Produit";
import { JSX, SVGProps, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { DOMAIN_NAME } from "@/utils/app_variables";
import { LoadingProducts } from "@/components/loadingProducts";
import { useParams } from "next/navigation";

import { FaWhatsapp } from "react-icons/fa";
import Akram_footer from "@/components/akram_footer";
import ProductCard from "@/components/ui/ProductCard";
import NoProduct from "@/components/ui/no-product";
import NotFound from "@/components/ui/notFound";
import { formatDateForMysql } from "@/utils/date";

export default function Component() {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState<Produits | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Produits[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/produits/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Ce produit n'existe pas");
        }
        const data: Produits = await response.json();
        setProduct(data);
      } catch (error: any) {
        setError(error.message || "Erreur de chargement du produit");
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchOtherProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${DOMAIN_NAME}/api/produits/by_category/${product?.categorie.parent_categorie}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Erreur de chargement des produits");
        }
        const data: Produits[] = await response.json();
        const products = data.filter((prod) => product?.id !== prod.id);
        setRelatedProducts(products);
      } catch (error: any) {
        setError(error.message || "Erreur de chargement des produits");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOtherProducts();
  }, [product]);

  if (error) return <NotFound />;

  return (
    <div>
      <header className="w-full flex items-center justify-center fixed z-20 top-0">
        <Header />
      </header>
      <section className="grid md:grid-cols-2 gap-20 lg:gap-12 items-start max-w-7xl px-4 mx-auto pt-20 mt-9">
        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-5 md:gap-3">
            <div className="h-[400px] md:w-[500px]">
              {product?.image_produit && (
                <img
                  className="w-full overflow-hidden"
                  src={`${DOMAIN_NAME}/storage/images/${product.image_produit}`}
                />
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:gap-10 items-start ">
          <div className="grid gap-2">
            <h1 className="font-bold text-3xl lg:text-4xl">
              {product?.nom_produit}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <p className="text-2xl font-bold hidden">MAD {product?.prix}</p>
            <p>{product?.description}</p>
          </div>
          <div className="grid gap-2 items-stretch">
            <h2 className="text-lg font-bold">Détails du produit</h2>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Nom de Produit :</span>
                <span>{product?.nom_produit}</span>
              </div>
              <div className="flex justify-between">
                <span>Catégorie :</span>
                <span>{product?.categorie.nom_categorie}</span>
              </div>
              <div className="flex justify-between">
                <span>Prix :</span>
                {product && (
                  <div className="flex items-center gap-3">
                    {product.en_promotion ? (
                      <div className="text-sm text-muted-foreground line-through">
                        {product.prix} MAD
                      </div>
                    ) : null} 
                    <div className="text-base font-semibold text-primary">
                      {(product.prix * (1 - product.remise / 100)).toFixed(2)}{" "}
                      MAD
                    </div>
                  </div>
                )}
              </div>
              {product && product.en_promotion && (
                <div className="flex justify-between">
                  <span>Date Fin Promotion :</span>
                  <div className="flex items-center gap-3">
                    <div className="text-base text-primary">
                      {product.date_limit_promotion}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end w-full mt-5">
                <Link
                  href="https://wa.me/+212661245588"
                  className="bg-green-500 w-1/2 py-2 text-white rounded-[50px] flex items-center justify-center"
                >
                  <FaWhatsapp className="text-" size={25} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-20">
        <h2 className="text-2xl font-bold mb-8">Produits Associés</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            <LoadingProducts />
          ) : (
            relatedProducts.map((prod) => <ProductCard product={prod} />)
          )}
          {!isLoading && relatedProducts.length === 0 && <NoProduct />}
        </div>
      </section>

      <Akram_footer />
    </div>
  );
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
