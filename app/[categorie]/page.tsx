// app/product-category/[id]/[category-parent]/[sous-category].tsx
"use client";
import Akram_footer from "@/components/akram_footer";
import Product_section from "@/components/products-section";
import Header from "@/components/layout/Header";
import { DOMAIN_NAME } from "@/utils/app_variables";
import { useEffect, useState } from "react";
import { Categorie, Produits } from "@/types/Produit";
import { LoadingProducts } from "@/components/loadingProducts";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import NotFound from "@/components/ui/notFound";
import NoProduct from "@/components/ui/no-product";

const Page = () => {
  const params = useParams();
  const categorie = params.categorie;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [SelectedCategorie, setSelectedCategorie] = useState<Categorie | null>(null);
  const [listProduits, setListProduits] = useState<Produits[]>([]);

  useEffect(() => {
    const fetchCategorie = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching products...");
        const response = await fetch(
          `${DOMAIN_NAME}/api/categories/slug/${categorie}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Products response:", response);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data: Categorie = await response.json();
        console.log("Products categorie:", data);
        setSelectedCategorie(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }finally {
        setIsLoading(false);
      }
    };
    fetchCategorie();
  }, []);

  useEffect(() => {
    const fetchProduits = async () => {
      try{
        setIsLoading(true);
        const response = await fetch(`${DOMAIN_NAME}/api/produits/by_category/${SelectedCategorie?.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(!response.ok){
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data: Produits[] = await response.json();
        setListProduits(data);
      }catch (error) {
        console.error(error);
      } finally{
        setIsLoading(false);
      }
    }
    if(SelectedCategorie){
      fetchProduits();
    }

  }, [SelectedCategorie]);

  return (
    <main className="min-h-screen">
      <header className="w-full flex items-center justify-center fixed z-20">
        <Header />
      </header>

      <section className="">
        <div
          className="h-[30vh] w-full bg-center bg-cover bg-no-repeat flex items-center "
          style={{ backgroundImage: `url('/images/hero-section-img.png')` }}
        >
          <div className="container h-full flex flex-col justify-center  relative">
            <div className="flex gap-2 items-center mt-8 md:mt-0 absolute bottom-20">
              <p className="text-white text-xl font-bold uppercase">
                {SelectedCategorie?.nom_categorie ? SelectedCategorie?.nom_categorie : ''}
              </p>
              <span className="text-white block">/</span>
            </div>
          </div>
        </div>
      </section>

      { !isLoading && !SelectedCategorie ? <NotFound /> :
        <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex justify-center">
            <div className="flex justify-center">
              <h2 className="text-2xl text-center font-bold text-slate-700 md:max-w-[600px] leading-7">{`${SelectedCategorie?.nom_categorie} / Produits`}</h2>
            </div>
          </div>

          <div>
            {isLoading ? (
              <LoadingProducts />
            ) : (
              <>
                {listProduits.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {listProduits.map((produit) => (
                      <ProductCard product={produit} />
                    ))}
                  </div>
                ) :  (
                  <NoProduct />
                )}

                {/* </div> */}
              </>
            )}
          </div>
        </div>
      </section>}

      <Akram_footer />
    </main>
  );
};

export default Page;
