import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/apiClient";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export type UserPros = {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
};

export type AdminAuthContextData = {
  user: UserPros;
  isAdmin: boolean;
};

export const AdminAuthContext = createContext({} as AdminAuthContextData);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const { signOut } = useContext(AuthContext)
  const [user, setUser] = useState<UserPros>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/admin")
        .then((response) => {
          const { _id, name, email, admin } = response.data;
          setUser({ _id, name, email, admin });
          if (admin === false) {
            signOut();
          }
          setIsAdmin(true);
        })
        .catch(() => {
          signOut();
          Router.push("/");
        });
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
