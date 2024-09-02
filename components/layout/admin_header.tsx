"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { logout, loadAuthState } from "@/store/authReducer";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { DOMAIN_NAME } from "@/utils/app_variables";
import { error } from "console";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

export default function Admin_Header() {
  const route = useRouter();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const [nbrMessage, setNbrMessage] = useState(0);
  useEffect(() => {
    setIsClient(true);
    if (isClient) {
      dispatch(loadAuthState());
    }
  }, [isClient, dispatch]);
  const api_token = useSelector((state: RootState) => state.auth.token);
  console.log(api_token);

  useEffect(() => {
    const get_new_messages = async () => {
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/contact/nbr_new`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("server erreur");
        }
        const data = await response.json();
        const nbr = data.number_messages;
        setNbrMessage(nbr);
      } catch (error) {
        console.error(error);
      }
    };
    if (api_token) {
      get_new_messages();
    }
  }, [api_token]);
  const handleLogout = async () => {
    try {
      const response = await fetch(`${DOMAIN_NAME}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${api_token}`,
        },
      });
      if (!response.ok) {
        throw new Error("unable to logout!");
      }
      dispatch(logout());
      route.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return !isClient ? null : (
    <header
      className={
        "h-[125px] py-5 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 " +
        (api_token === "" ? " hidden" : " flex")
      }
    >
      <Link href={"/admin_page"} className="flex-1">
        <h1 className="text-lg font-semibold">Page d&apos;administration</h1>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            AK
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-20">
          <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/admin_page"}>Gestion des produits/catégories</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={"" + (nbrMessage > 0 && " bg-red-200")}>
            <Link href={"/admin_page/messages"} className={"flex gap-2"}>
              {nbrMessage > 0 && (
                <Badge
                  variant={"outline"}
                  className="w-5 h-5 p-0 text-sm flex items-center justify-center rounded-full bg-red-200 text-red-500 border-red-500"
                >
                  {nbrMessage}
                </Badge>
              )}
              <p>Gestion des messages clients</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
