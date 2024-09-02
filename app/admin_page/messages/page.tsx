"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { RootState } from "@/store/redux";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Messages } from "@/types/Messages";
import { ChevronUp, RefreshCcw } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DOMAIN_NAME } from "@/utils/app_variables";
import {loadAuthState} from "@/store/authReducer";

export default function Liste_des_messages() {
  const dispatch = useDispatch();
  dispatch(loadAuthState());
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const api_token = useSelector((state: RootState) => state.auth.token);
  const [listMessage, setListMessages] = useState<Messages[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth || api_token === "") {
      router.push("/admin_page");
    }

    const getAllMessage = async () => {
      try {
        const response = await fetch(`${DOMAIN_NAME}/api/contact`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${api_token}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            "une erreur s'est produite lors de la récupération des données de contact"
          );
        }
        const data: Messages[] = await response.json();
        setListMessages(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllMessage();
  }, [isAuth, api_token, refresh]);

  const filteredMessages = listMessage.filter(
    (message) =>
      message.nom_client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email_client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message_client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortAsc ? dateA - dateB : dateB - dateA;
  });

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${DOMAIN_NAME}/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${api_token}`,
        },
      });
      if (!response.ok) {
        throw new Error("message not deleted");
      }
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex items-start justify-center bg-slate-100 min-h-screen pt-[125px]">
      <Card className="w-full mx-7 my-12">
        <CardHeader>
          <CardTitle>Messages des utilisateurs</CardTitle>
          <CardDescription>
            Gérez les messages de vos utilisateurs.
          </CardDescription>
        </CardHeader>
        <div className="w-1/2 mt-4 flex flex-col items-start gap-4 mx-5 my-2">
          <h1 className="text-slate-700">Rechercher un Message Spécifique:</h1>
          <Input
            type="search"
            placeholder="recherchez"
            className="w-[453px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            onClick={() => setRefresh((prev) => !prev)}
            variant={"ghost"}
            className="flex gap-4"
          >
            <p>Actualiser</p>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => setSortAsc((prev) => !prev)}
                >
                  Date
                  <ChevronUp
                    className={`transition-transform ${
                      sortAsc ? "rotate-180" : ""
                    }`}
                  />
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMessages.map((message, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {message.nom_client}
                  </TableCell>
                  <TableCell>{message.email_client}</TableCell>
                  <TableCell>{message.message_client}</TableCell>
                  <TableCell>
                    {new Date(message.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger className="w-[125px] h-9 border rounded-sm border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors">
                        Supprimer
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Êtes-vous absolument sûr ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cela supprime
                            définitivement le message.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(message.id)}
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
      </Card>
    </section>
  );
}
