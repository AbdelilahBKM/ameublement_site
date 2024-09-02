"use client";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Categorie, Produits } from "@/types/Produit";
import { RootState } from "@/store/redux";
import { useSelector } from "react-redux";
import { DOMAIN_NAME } from "@/utils/app_variables";
import { Skeleton } from "./ui/skeleton";

export default function Component() {
  const [isProduct, setIsProduct] = useState<boolean>(true);
  const [listProduits, setListProduits] = useState<Produits[]>([]);
  const [listCategories, setListCategories] = useState<Categorie[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [productSearchQuery, setProductSearchQuery] = useState<string>("");
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>("");
  const api_token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/categories`, {
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

        const data = await response.json();
        setListCategories(data);
      } catch (error) {
        console.error(`Error fetching categories: ${(error as Error).message}`);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/produits`, {
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

        const data = await response.json();
        setListProduits(data);
      } catch (error) {
        console.error(`Error fetching products: ${(error as Error).message}`);
      } 
    };

    if (api_token) {
      Promise.all([fetchCategories(), fetchProducts()]);
    }
  }, [api_token, refresh]);

  const handleDeleteProduct = async (id: number) => {
    if (id !== 0) {
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/produits/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_token}`,
          },
        });
        if (!response.ok) {
          throw new Error("product probably doesnt exist");
        }
        setRefresh((prev) => !prev);
      } catch (error) {
        console.error("erreur while deleting product", error);
      }
    }
  };
  const handleDeleteCategorie = async (id: number) => {
    if (id !== 0) {
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/categories/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_token}`,
          },
        });
        if (!response.ok) {
          throw new Error("La catégorie n'existe probablement pas");
        }
        setRefresh((prev) => !prev);
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie:", error);
      }
    }
  };

  const filteredProducts = listProduits.filter(
    (prod) =>
      prod.nom_produit
        .toLowerCase()
        .includes(productSearchQuery.toLowerCase()) ||
      prod.description
        .toLowerCase()
        .includes(productSearchQuery.toLowerCase()) ||
      prod.categorie.nom_categorie
        .toLowerCase()
        .includes(productSearchQuery.toLowerCase())
  );

  const filteredCategories = listCategories.filter(
    (categorie) =>
      categorie.nom_categorie
        .toLowerCase()
        .includes(categorySearchQuery.toLowerCase()) ||
      categorie.description_categorie
        .toLowerCase()
        .includes(categorySearchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 py-[125px]">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="products">
            <div className="flex items-end">
              <TabsList>
                <TabsTrigger
                  onClick={() => setIsProduct(true)}
                  className="rounded"
                  value="products"
                >
                  Produits
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setIsProduct(false)}
                  className="rounded"
                  value="categories"
                >
                  Categories
                </TabsTrigger>
              </TabsList>
              <Link
                href={
                  isProduct
                    ? "/admin_page/ajouter_produit"
                    : "/admin_page/ajouter_categorie"
                }
                className="ml-auto border border-slate-700 px-4 py-2 rounded-sm hover:bg-slate-700 hover:text-white transition-colors"
              >
                Ajouter Un Nouveau
              </Link>
            </div>
            {/* produits */}
            <TabsContent value="products">
              <Card className="" x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Vos Produits</CardTitle>
                  <CardDescription>Gérez vos produits.</CardDescription>
                  <CardContent>
                    <Button
                      onClick={() => setRefresh((prev) => !prev)}
                      variant={"ghost"}
                      className="flex gap-4"
                    >
                      <p>Actualiser</p>
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <div className="w-1/2 mt-4 flex flex-col items-start gap-4">
                      <h1>Rechercher un Article Spécifique:</h1>
                      <Input
                        type="search"
                        placeholder="recherchez"
                        className="w-[453px]"
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Prix de base</TableHead>
                        <TableHead>Prix actuel</TableHead>
                        <TableHead>date d'expiration Solde</TableHead>
                        <TableHead>Categories</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((prod) => (
                        <TableRow key={prod.id}>
                          <TableCell>
                            <Image
                              src={`${DOMAIN_NAME}/storage/images/${prod.image_produit}`}
                              alt={prod.nom_produit}
                              width={50}
                              height={50}
                              className="w-20 h-fit rounded-sm"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {prod.nom_produit}
                          </TableCell>
                          <TableCell>{prod.description}</TableCell>
                          <TableCell>
                            MAD {prod.prix}{" "}
                            {prod.en_promotion && (
                              <span className="text-red-600">
                                {" "}
                                -{prod.remise}%
                              </span>
                            )}
                          </TableCell>
                          {!prod.en_promotion ? (
                            <TableCell>MAD {prod.prix}</TableCell>
                          ) : (
                            <TableCell className="text-green-600">
                              MAD {prod.prix * (1 - prod.remise / 100)}
                            </TableCell>
                          )}
                          <TableCell>
                            {prod.en_promotion
                              ? prod.date_limit_promotion
                              : "null"}
                          </TableCell>
                          <TableCell>{prod.categorie.nom_categorie}</TableCell>
                          <TableCell className="flex gap-7">
                            <Link
                              href={"/admin_page/produit/" + prod.id}
                              className="px-4 py-2 border border-slate-800 rounded-sm hover:bg-slate-800 hover:text-slate-50 transition-colors"
                            >
                              modifier
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger className="w-[125px] border rounded-sm border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors">
                                Suprimmer
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Etes-vous absolument sûr ?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Cette action ne peut pas être annulée. Cela
                                    supprimera définitivement l&apos;élément de
                                    la base de données.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteProduct(prod.id)}
                                    className="bg-red-400 hover:bg-red-700"
                                  >
                                    Continuer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    affichant <strong>{filteredProducts.length !== 0? 1: 0} - {filteredProducts.length}</strong> sur{" "}
                    <strong>{filteredProducts.length}</strong> produits
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            {/* categories */}
            <TabsContent value="categories">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Catégories</CardTitle>
                  <CardDescription>
                    Gérez vos catégories de produits.
                  </CardDescription>
                  <CardContent>
                    <Button
                      onClick={() => setRefresh((prev) => !prev)}
                      variant={"ghost"}
                      className="flex gap-4"
                    >
                      <p>Actualiser</p>
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <div className="w-1/2 mt-4 flex flex-col items-start gap-4">
                      <h1>Rechercher un Article Spécifique</h1>
                      <Input
                        type="search"
                        placeholder="recherchez"
                        className="w-[453px]"
                        value={categorySearchQuery}
                        onChange={(e) => setCategorySearchQuery(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom Catégorie</TableHead>
                        <TableHead>Categorie Parent</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCategories.map((categorie) => (
                        <Fragment key={categorie.id}>
                          <TableRow key={categorie.id}>
                            <TableCell className="font-medium">
                              {categorie.nom_categorie}
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                              {categorie.description_categorie}
                            </TableCell>
                            <TableCell className="flex gap-7">
                              <Link
                                href={"/admin_page/categorie/" + categorie.id}
                                className="px-4 py-2 border border-slate-800 rounded-sm hover:bg-slate-800 hover:text-slate-50 transition-colors"
                              >
                                modifier
                              </Link>
                              <AlertDialog>
                                <AlertDialogTrigger className="w-[125px] border rounded-sm border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors">
                                  Suprimmer
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Etes-vous absolument sûr ?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Cette action ne peut pas être annulée.
                                      Cela supprime définitivement la catégorie
                                      de la base de données et tous les produits
                                      avec cette catégorie.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Annuler
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteCategorie(categorie.id)
                                      }
                                      className="bg-red-400 hover:bg-red-700"
                                    >
                                      Continuer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                          {categorie.children.map((sub) => (
                            <TableRow key={sub.id}>
                              <TableCell className="font-medium">
                                {sub.nom_categorie}
                              </TableCell>
                              <TableCell>{categorie.nom_categorie}</TableCell>
                              <TableCell>{sub.description_categorie}</TableCell>
                              <TableCell className="flex gap-7">
                                <Link
                                  href={"/admin_page/categorie/" + sub.id}
                                  className="px-4 py-2 border border-slate-800 rounded-sm hover:bg-slate-800 hover:text-slate-50 transition-colors"
                                >
                                  modifier
                                </Link>
                                <AlertDialog>
                                  <AlertDialogTrigger className="w-[125px] border rounded-sm border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors">
                                    Suprimmer
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Etes-vous absolument sûr ?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Cette action ne peut pas être annulée.
                                        Cela supprime définitivement la
                                        catégorie de la base de données et tous
                                        les produits avec cette catégorie.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Annuler
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleDeleteCategorie(categorie.id)
                                        }
                                        className="bg-red-400 hover:bg-red-700"
                                      >
                                        Continuer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TableCell>
                            </TableRow>
                          ))}
                        </Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    affichant <strong>{filteredCategories.length !== 0? 1: 0} - {filteredCategories.length}</strong> sur{" "}
                    <strong>{filteredCategories.length}</strong> catégories
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
