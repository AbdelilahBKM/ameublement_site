"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";

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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { RootState } from "@/store/redux";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authReducer";
import { Categorie } from "@/types/Produit";
import { AlertCircle, X } from "lucide-react";
import { DOMAIN_NAME } from "@/utils/app_variables";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AjouterProduit() {
  const api_token = useSelector((state: RootState) => state.auth.token);
  const params = useParams();
  const id = params.id;
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();
  const [categorie, setCategorie] = useState<Categorie | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const [nomCategorie, setNomCategorie] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [notification, setNotification] = useState("");
  const [listCategories, setListCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    if (!isAuth) {
      dispatch(logout());
      router.push("/admin_page");
    } else {
      const fetchCategorie = async () => {
        try {
          const response = await fetch(`${DOMAIN_NAME}/api/categories/${id}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Ce produit n'existe pas");
          }
          const data: Categorie = await response.json();
          setCategorie(data);
          setNomCategorie(data.nom_categorie);
          setDescription(data.description_categorie);
          if (data.parent_categorie) {
            setSelectedCategory(Number(data.parent_categorie));
            const getCategoriesRes = await fetch(
              `${DOMAIN_NAME}/api/categories`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (!getCategoriesRes.ok) {
              throw new Error(
                `Network response was not ok: ${getCategoriesRes.statusText}`
              );
            }
            const categories = await getCategoriesRes.json();
            setListCategories(categories);
          }
        } catch (error) {
          console.error("Error fetching Category:", error);
          setError(
            "Une erreur s'est produite lors de la tentative d'obtention de cette catégorie"
          );
        }
      };
      fetchCategorie();
    }
  }, [id, isAuth, dispatch, router]);

  const handleAlertDialogConfirm = async () => {
    if (formRef.current) {
      await handleSubmit();
    }
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setError("");
    setNotification("");
    setIsLoading(true);
    if (nomCategorie !== "" && description !== "") {
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/categories/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${api_token}`,
          },
          body: JSON.stringify({
            nom_categorie: nomCategorie,
            description_categorie: description,
            parent_categorie: categorie?.parent_categorie
              ? selectedCategory
              : null,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Category updated successfully:", result);
          setNotification("Catégorie mise à jour avec succès !");

          setIsLoading(false);
          setDescription("");
          setNomCategorie("");
        } else {
          const errorResult = await response.json();
          console.error("Error updating category:", errorResult);
          setError("Une erreur s'est produite lors de la connexion.");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Network error:", error);
        setError(
          "Une erreur est survenue lors de la mise à jour de la catégorie."
        );
      }
    } else {
      setIsLoading(false);
      setError("Veuillez remplir tous les champs.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-start bg-slate-100 min-h-screen py-[125px]">
      {notification !== "" && (
        <Alert
          variant={"default"}
          className="w-[500px] border-green-800 text-green-800 mt-4"
        >
          <X
            onClick={() => setNotification("")}
            className="h-5 w-5 text-green-800 cursor-pointer"
          />
          <AlertTitle>Succès!</AlertTitle>
          <AlertDescription>{notification}</AlertDescription>
        </Alert>
      )}
      <Card className="mt-4 shadow w-[775px]">
        <CardHeader>
          <CardTitle>Modifier Catégorie N°{id}</CardTitle>
          <CardDescription>
            Mettez à jour les détails de la catégorie.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} ref={formRef} className="grid gap-6">
          <CardContent>
            <div className="grid gap-2 mb-4">
              <Label htmlFor="title">Titre de la Catégorie</Label>
              <Input
                value={nomCategorie}
                onChange={(e) => setNomCategorie(e.target.value)}
                id="title"
                placeholder="Entrez le titre de la catégorie"
              />
            </div>
            <div className="grid gap-2 mb-4">
              <Label htmlFor="description">Description de la Catégorie</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                placeholder="Entrez la description de la catégorie"
                className="min-h-[120px]"
              />
            </div>
            {categorie?.parent_categorie && (
              <div className="grid gap-2 mb-4">
                <Label htmlFor="title">Catégorie Parente</Label>
                <Select
                  value={selectedCategory.toString()}
                  onValueChange={(value) => setSelectedCategory(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Categorie de produit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={0} value="0">
                      Categorie de produit
                    </SelectItem>
                    {listCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.nom_categorie}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-start">
            <Alert
              variant="destructive"
              className={error !== "" ? "block" : "hidden"}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur:</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <AlertDialog>
              <AlertDialogTrigger
                disabled={isLoading}
                className="border border-slate-800 text-slate-800 px-4 py-2 rounded-sm hover:bg-slate-800 hover:text-white transition-colors"
              >
                {isLoading ? "Veuillez patienter..." : "Modifier Catégorie"}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    En êtes-vous absolument sûr ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action mettra à jour la catégorie
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleAlertDialogConfirm}>
                    Continuer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
