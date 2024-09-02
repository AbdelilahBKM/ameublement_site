"use client";
import Link from "next/link";
import React, { JSX, SVGProps, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { DOMAIN_NAME } from "@/utils/app_variables";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ChevronRightIcon } from "lucide-react";
import { Categorie } from "@/types/Produit";

export default function Component() {
  const [listCategories, setListCategories] = useState<Categorie[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCatDroped, setIsCatDroped] =  useState<boolean>(false);
  
  useEffect(() => {
    const fetchCategoriesforMenu = async () => {
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

        const data = await response.json();
        setListCategories(data);
        console.log("list Categories ----->", data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    console.log("list Categories ----->", listCategories);
    fetchCategoriesforMenu();
  }, []);

  return (
    <header className="flex items-center justify-between py-7 px-4 bg-white md:px-6 w-full shadow-lg relative z-20">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image src={"/akram-logo.png"} alt="" width={50} height={32} />
        <span className="text-2xl font-semibold">Akram</span>
      </Link>

      <nav className="hidden lg:flex md:flex-wrap items-center gap-6 text-base font-semibold">
        <Link
          href="/"
          className="text-[14px] text-black font-[600] hover:underline"
          prefetch={false}
        >
          Accueil
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/produits_services">
                  <span className="text-[14px] flex items-center text-black font-[600] hover:underline">
                    Nos produits et services
                  </span>
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {listCategories.map((categorie) => (
                  <div key={categorie.id} className="relative group">
                    <div className="grid w-fit gap-4">
                      <NavigationMenuLink asChild className="group">
                        <div
                          className="group grid h-auto w-full items-center justify-start gap-2 rounded-md bg-background p-3 text-sm font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        >
                          <Link 
                            href={`/${categorie.nom_categorie}`} 
                            className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900 leading-none hover:underline">
                              {categorie.nom_categorie}
                            </span>
                            <ChevronRightIcon className="h-4 w-4" />
                          </Link>
                          <div>
                            <div className="w-[250px] bg-white hidden group-hover:block">
                              <div>
                                <Link
                                  href={`/${categorie.nom_categorie}`}
                                  className="flex hover:underline items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                  prefetch={false}
                                >
                                  <span>{categorie.nom_categorie}</span>
                                </Link>
                              </div>
                              {categorie.children.map((sub) => (
                                <div key={sub.id}>
                                  <Link
                                    href={`/${categorie.nom_categorie}/${sub.nom_categorie}`}
                                    className="flex hover:underline items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                  >
                                    <span>{sub.nom_categorie}</span>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </div>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Link
          href="/#about-us"
          className="text-[14px] text-black font-[600] hover:underline"
          prefetch={false}
        >
          Qui Sommes-Nous
        </Link>
        <Link
          href="/#contact"
          className="text-[14px] text-black font-[600] hover:underline underline-offset-4"
          prefetch={false}
        >
          Nous Contactez
        </Link>
      </nav>  
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          className="text-black"
        >
          {isMenuOpen ? <IoMdClose size={24} /> : <CiMenuBurger size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          <nav className="flex flex-col items-start gap-4 p-4">
            <Link
              href="/"
              className="text-[14px] text-black font-[600] hover:underline"
              onClick={() => setIsMenuOpen(false)}
              prefetch={false}
            >
              Accueil
            </Link>
            <div className="w-full">
              <div className="flex items-center justify-between w-full cursor-pointer">
                <Link
                  href="/produits_services"
                  className="text-[14px] flex items-center text-black font-[600] hover:underline"
                  prefetch={false}
                >
                  Nos produits et services
                </Link>
                <IoMdArrowDropdown size={20} className="text-black"  onClick={() => setIsCatDroped(prev => !prev)}/>
              </div>
              {isCatDroped &&
                <div className="mt-2 pl-4 flex flex-col gap-2">
                {listCategories.map((categorie) => (
                  <div key={categorie.id}>
                    <Link
                      href={`/${categorie.nom_categorie}`} 
                      className="text-[14px] text-black font-[600] hover:underline"
                      onClick={() => setIsMenuOpen(false)}
                      prefetch={false}
                    >
                      {categorie.nom_categorie}
                    </Link>
                    <div className="pl-4 flex flex-col gap-1">
                      {categorie.children.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/${categorie.nom_categorie}/${sub.nom_categorie}`}
                          className="text-[14px] text-slate-700 font-medium hover:underline"
                          onClick={() => setIsMenuOpen(false)}
                          prefetch={false}
                        >
                          {sub.nom_categorie}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              }
            </div>
            <Link
              href="#"
              className="text-[14px] text-black font-[600] hover:underline"
              onClick={() => setIsMenuOpen(false)}
              prefetch={false}
            >
              Qui Sommes-Nous
            </Link>
            <Link
              href="/#contact"
              className="text-[14px] text-black font-[600] hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
              prefetch={false}
            >
              Nous Contactez
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

