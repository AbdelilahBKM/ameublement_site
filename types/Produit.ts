// Represents a product
export interface Produits {
  id: number;
  nom_produit: string;
  description: string;
  image_produit: string;
  image_url: string;
  prix: number;
  categorie: Categorie;
  en_promotion: boolean;
  remise: number;
  date_limit_promotion: string | null;
  created_at: Date;
  updated_at: Date;
};

// Represents a category
export interface Categorie {
  id: number;
  nom_categorie: string;
  description_categorie: string;
  parent_categorie: number | null;
  created_at: string;
  updated_at: string;
  children: Categorie[];
}


