"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { checkDateValide, formatDateForMysql } from "@/utils/date";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authReducer";
import { RootState } from "@/store/rootReducer";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Categorie, Produits } from "@/types/Produit";
import { AlertCircle, CalendarDaysIcon, X } from "lucide-react";
import { DOMAIN_NAME } from "@/utils/app_variables";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";

export default function Component() {
  const params = useParams();
  const id = params.id;
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();

  if (!isAuth) {
    dispatch(logout());
    router.push("/admin_page");
  }
  const api_token = useSelector((state: RootState) => state.auth.token);

  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [produit, setProduit] = useState<Produits | null>(null);
  const [listCategories, setListCategories] = useState<Categorie[]>([]);
  const [nomProd, setNomProd] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [prixProduit, setPrixProduit] = useState<number>(0.0);
  const [enPromo, setEnPromo] = useState<boolean>(false);
  const [dateFinPromo, setDateFinPromo] = useState<Date | undefined>(
    new Date()
  );
  const [tauxRemise, setTauxRemise] = useState<number>(0.0);
  const [categorie, setCategorie] = useState<Number>(0);
  const [subCategorie, setSubCategorie] = useState<Number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [notification, setNotification] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState<Categorie | null>(
    null
  );

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/produits/${id}`);
        if (!response.ok) {
          throw new Error("Ce produit n'existe pas");
        }
        const data: Produits = await response.json();
        setProduit(data);
        setNomProd(data.nom_produit);
        setDescription(data.description);
        setImageName(data.image_produit);
        setImageUrl(data.image_url);
        setPrixProduit(Number(data.prix));
        setEnPromo(data.en_promotion);
        setTauxRemise(data.en_promotion ? data.remise : 0.0);
        setDateFinPromo(
          data.date_limit_promotion
            ? new Date(data.date_limit_promotion)
            : undefined
        );
      } catch (error) {
        console.error("Error fetching Product:", error);
        setError(
          "une erreur s'est produite lors de la tentative d'obtention de ce produit"
        );
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/categories`);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data: Categorie[] = await response.json();
        setListCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProduit();
    fetchCategories();
  }, [id]);

  const handleAlertDialogConfirm = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSelectChange = (value: string) => {
    setCategorie(Number(value));
    const categories = listCategories.filter(
      (categorie) => categorie.id === Number(value)
    );
    setSelectedCategorie(categories[0]);
    console.log(value);
  };

  const UploadImage = async () => {
    setError("");
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(`${DOMAIN_NAME}/api/upload-image`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${api_token}`,
            Accept: "application/json",
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }
        const data = await response.json();
        setImageName(data.imageName);
        setNotification("Image téléchargée avec succès!");
      } catch (error) {
        console.error("Error uploading image:", error);
        setError(
          "Erreur lors de l'envoi de l'image.\n L'image doit être de l'un des types spécifiés (JPEG, PNG, JPG, GIF, WEBP) et la taille de fichier maximale autorisée pour l'image est 2Mo."
        );
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setNotification("");
    setIsLoading(true);

    if (nomProd && description && prixProduit > 0 && categorie !== 0) {
      if (enPromo && tauxRemise === 0) {
        setIsLoading(false);
        setError("Le taux de promotion ne peut pas être de 0.");
        return;
      }

      if (enPromo && dateFinPromo && !checkDateValide(dateFinPromo)) {
        setIsLoading(false);
        setError("La date de fin de promotion doit être dans le futur.");
        return;
      }
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/produits/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_token}`,
          },
          body: JSON.stringify({
            nom_produit: nomProd,
            image_produits: imageName,
            image_url: imageUrl,
            description: description,
            prix: prixProduit,
            categorie: subCategorie !== 0 ? subCategorie : categorie,
            en_promotion: enPromo,
            remise: enPromo ? tauxRemise : null,
            date_limit_promotion: enPromo
              ? formatDateForMysql(dateFinPromo!)
              : null,
          }),
        });

        if (response.ok) {
          const result: Produits = await response.json();
          setNotification("produit mis à jour avec succès!");
          setIsLoading(false);
          setNomProd(result.nom_produit);
          setDescription(result.description);
          setPrixProduit(Number(result.prix));
        } else {
          const errorResult = await response.json();
          console.error("Error adding product:", errorResult);
          setError("Une erreur s'est produite lors de la connexion.");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Network error:", error);
        setError("Une erreur est survenue lors de la mis à jour du produit.");
      }
    } else {
      setIsLoading(false);
      setError("Veuillez remplir tous les champs.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-start bg-slate-100 min-h-screen py-[125px]">
      {notification && (
        <Alert
          variant={"default"}
          className="w-[500px] border-green-800 text-green-800 mt-4 mb-2"
        >
          <X
            onClick={() => setNotification("")}
            className="h-5 w-5 text-green-800 cursor-pointer"
          />
          <AlertTitle>Succès!</AlertTitle>
          <AlertDescription>{notification}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Modifier Produit N° {id}</CardTitle>
          <CardDescription>
            Mettez à jour les détails de votre produit.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} ref={formRef} className="grid gap-6">
          <CardContent>
            <div className="grid gap-2 mb-4">
              <Label htmlFor="image">Image du produit</Label>
              <div className="flex items-center justify-between gap-2">
                <Input id="image" type="file" onChange={handleFileChange} />
                <div
                  onClick={UploadImage}
                  className="text-sm w-[250px] border border-slate-700 text-slate-700 rounded-sm px-4 py-3 text-center hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                >
                  {isLoading ? "Veuillez patienter..." : "Télécharger Image"}
                </div>
              </div>
            </div>
            <div className="grid gap-2 mb-4">
              <Label htmlFor="title">Titre du produit</Label>
              <Input
                value={nomProd}
                onChange={(e) => setNomProd(e.target.value)}
                id="title"
                placeholder="Entrez le titre du produit"
              />
            </div>
            <div className="grid gap-2 mb-4">
              <Label htmlFor="description">Description du produit</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                placeholder="Entrez la description du produit"
                className="min-h-[120px]"
              />
            </div>
            <div className="grid gap-2 mb-4">
              <Select
                value={categorie.toString()}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Categorie de produit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={0} value="0">
                    Categorie de produit
                  </SelectItem>
                  {listCategories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.nom_categorie}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 mb-4">
              <Select
                value={subCategorie.toString()}
                onValueChange={(value) => setSubCategorie(Number(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sous-catégorie de produit" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategorie ? (
                    <SelectItem key={0} value="0">
                      {selectedCategorie.nom_categorie}
                    </SelectItem>
                  ) : (
                    <SelectItem key={0} value="0">
                      sous-catégorie de produit
                    </SelectItem>
                  )}
                  {selectedCategorie?.children.map((sous) => (
                    <SelectItem key={sous.id} value={sous.id.toString()}>
                      {sous.nom_categorie}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-full items-center gap-4">
              <div className="grid gap-2 mb-4">
                <Label htmlFor="price">Prix</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    min={0.0}
                    className="flex-1"
                    value={prixProduit}
                    onChange={(e) => setPrixProduit(Number(e.target.value))}
                  />
                  <Select>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="MAD" />
                    </SelectTrigger>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={enPromo}
                  onCheckedChange={(value) => setEnPromo(value)}
                  id="airplane-mode"
                />
                <Label htmlFor="airplane-mode">En promotion?</Label>
              </div>
            </div>
            {enPromo && (
              <div className="flex flex-col w-full items-start gap-4 md:flex-row md:items-center">
                <div className="grid gap-2 mb-4 w-1/2">
                  <Label htmlFor="discount">Taux de Réduction %</Label>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="Enter discount rate"
                    min={0}
                    max={100}
                    value={tauxRemise}
                    onChange={(e) => setTauxRemise(Number(e.target.value))}
                  />
                </div>
                <div className="w-1/2 h-full text-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDaysIcon className="mr-2 h-full w-4" />
                        Date d'Expiration
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        selected={dateFinPromo}
                        onSelect={setDateFinPromo}
                        mode="single"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-start">
            <Alert variant="destructive" className={error ? "block" : "hidden"}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur:</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <AlertDialog>
              <AlertDialogTrigger
                disabled={isLoading}
                className="border border-slate-800 text-slate-800 px-4 py-2 rounded-sm hover:bg-slate-800 hover:text-white transition-colors"
              >
                {isLoading ? "Veuillez patienter..." : "Mettre à Jour Produit"}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    En êtes-vous absolument sûr ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action mettra à jour le produit sélectionné
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
