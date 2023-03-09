import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AdminAuthContext } from "../../../contexts/AdminAuthContext";
import { AuthContext } from "../../../contexts/AuthContext";
import Navigation from "../menuNavigation";
import s from "./styles.module.scss";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

function Layout({ children }: Props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { isAdmin } = useContext(AdminAuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (!isAdmin) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [user, isAdmin, router]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={s.layout}>
      <Navigation />
      {children}
    </div>
  );
}

export default Layout;
