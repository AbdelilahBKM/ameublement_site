"use client"
import AdminPage from "@/components/admintwo";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const Admin = () => {
    const { isAuth } = useAuth();
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    if (!isAuth) {
        return null;
    }

    return isClient ? <AdminPage /> : null;
};

export default Admin;
