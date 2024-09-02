"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { logout, loadAuthState } from "@/store/authReducer";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { DOMAIN_NAME } from "@/utils/app_variables";
import { error } from "console";
import { useEffect, useState } from "react";

export default function Admin_Header() {
    
    const route = useRouter();
    const dispatch = useDispatch();
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
        if (isClient) {
            dispatch(loadAuthState());
        }
    }, [isClient, dispatch]);
    const api_token = useSelector((state: RootState) => state.auth.token);
    console.log(api_token);
    const handleLogout = async () => {
        try {
            const response = await fetch(`${DOMAIN_NAME}/api/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${api_token}`
                }
            });
            if (!response.ok) {
                throw new Error("unable to logout!");
            }
            dispatch(logout());
            route.refresh();

        } catch (error) {
            console.error(error);
        }
    }


    return !isClient ? null : (
        <header className={"h-[125px] py-5 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 " + (api_token === '' ? ' hidden' : ' flex')}>
            <Link href={"/admin_page"} className="flex-1">
                <h1 className="text-lg font-semibold">Page d&apos;administration</h1>
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                        AK
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-20">
                    <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={"/admin_page"}>
                            Gestion des produits/catégories
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={"/admin_page/messages"}>
                            Gestion des messages clients
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Se déconnecter</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}