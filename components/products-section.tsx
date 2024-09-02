"use client";
import { useEffect, useState } from "react";
import { Categorie, Produits } from "@/types/Produit";
import { LoadingProducts } from "./loadingProducts";
import { DOMAIN_NAME } from "@/utils/app_variables";
import NoProduct from "./ui/no-product";
import ProduitsEnPromo from "./produits-en-promo";
import ProductCard from "./ui/ProductCard";

export default function Product_section() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listProduits, setListProduits] = useState<Produits[]>([]);
  const [listProduitsPromo, setListProduitsPromo] = useState<Produits[]>([]);
  const [listCategories, setListCategories] = useState<Categorie[]>([]);
  const [listSousCategories, setListSousCategories] = useState<Categorie[]>([]);
  const [produitsAfficher, setProduitsAfficher] = useState<Produits[]>([]);
  const [activeCategory, setActiveCategory] = useState<Categorie | null>(null);
  const [activeSousCategory, setActiveSousCategory] = useState(99);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories...");
        const response = await fetch(`${DOMAIN_NAME}/api/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Categories response:", response);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data: Categorie[] = await response.json();
        console.log("Categories data:", data);

        setListCategories(data);
        setActiveCategory(data[0]);
        setListSousCategories(data[0].children);
        setActiveSousCategory(0);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await fetch(`${DOMAIN_NAME}/api/produits`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Products response:", response);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data: Produits[] = await response.json();
        console.log("Products data:", data);
        setListProduits(data);
        setProduitsAfficher(
          data.filter(
            (prod: Produits) => prod.categorie.id === activeCategory?.id
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchSales = async () => {
      try {
        console.log("Fetching products on sale...");
        const response = await fetch(`${DOMAIN_NAME}/api/produits_en_promo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data: Produits[] = await response.json();
        setListProduitsPromo(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    

    fetchCategories();
    fetchProducts();
    fetchSales();
  }, []);

  const handleSelectCategorie = (categorie: Categorie) => {
    setActiveCategory(categorie);
    setListSousCategories(categorie.children);
    setActiveSousCategory(0);
  };

  useEffect(() => {
    if (activeCategory)
      setProduitsAfficher(
        listProduits.filter((prod) => {
          if (activeSousCategory === 0) {
            return (
              prod.categorie.id === activeCategory.id ||
              prod.categorie.parent_categorie === activeCategory.id
            );
          }
          return prod.categorie.id === activeSousCategory;
        })
      );
  }, [listProduits, activeCategory, activeSousCategory]);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const productsToDisplay = showAll
    ? produitsAfficher
    : produitsAfficher.slice(0, 8);

  return (
    <section className="bg-background py-12 px-4 md:px-6">
      {listProduitsPromo.length !== 0 && (
        <ProduitsEnPromo produits={listProduitsPromo} />
      )}
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex justify-center">
          <h2 className="text-2xl font-bold text-slate-700">
            {" "}
            Nos Produits et Services{" "}
          </h2>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center mb-16">
          <nav className="flex justify-center p-4 bg-gray-100 rounded-full w-full sm:w-3/4 md:w-fit">
            <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4 text-slate-700">
              {listCategories.map((category) => (
                <li key={category.id}>
                  <div>
                    <button
                      id={`${category.nom_categorie.toLowerCase()}`}
                      className={`px-3 py-2 rounded-full ${
                        activeCategory?.id === category.id
                          ? " bg-white font-semibold shadow"
                          : " hover:bg-gray-200"
                      }`}
                      onClick={() => handleSelectCategorie(category)}
                    >
                      {category.nom_categorie}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          {activeCategory?.children.length !== 0 &&
            <nav className="flex justify-center p-4 bg-gray-100 rounded-full w-full sm:w-3/4 md:w-fit">
            <ul className="flex text-sm flex-wrap justify-center space-x-2 sm:w-full text-slate-700">
              <li key={0}>
                <div>
                  <button
                    className={`px-3 py-2 rounded-full ${
                      activeSousCategory === 0
                        ? " bg-white font-semibold shadow"
                        : " hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveSousCategory(0)}
                  >
                    {activeCategory?.nom_categorie}
                  </button>
                </div>
              </li>
              {listSousCategories.map((sub) => (
                <li key={sub.id}>
                  <div>
                    <button
                      className={`px-3 py-2 rounded-full ${
                        activeSousCategory === sub.id
                          ? " bg-white font-semibold shadow"
                          : " hover:bg-gray-200"
                      }`}
                      onClick={() => setActiveSousCategory(sub.id)}
                    >
                      {sub.nom_categorie}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </nav>}
        </div>

        {isLoading ? (
          <LoadingProducts />
        ) : productsToDisplay.length === 0 ? (
          <NoProduct />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productsToDisplay.map((product) => (
                <ProductCard product={product} key={product.id}/>
              ))}
            </div>
            {listProduits.length > 8 && (
              <div className="mt-8 flex justify-center">
                <button
                  className="w-[245px] h-[48px] rounded-none bg-white text-orange-400 border transition-colors border-orange-400 hover:bg-orange-400 hover:text-white"
                  onClick={handleShowMore}
                >
                  {showAll ? "Afficher moins" : "Afficher plus"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
