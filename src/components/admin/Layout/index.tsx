import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AdminAuthContext } from "../../../contexts/AdminAuthContext";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../Loader";
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
  const layoutRef = useRef(null);

  useEffect(() => {
    function onWheelChange() {
      const layout = layoutRef.current;
      layout.classList.add(s.showAnimation);
      setTimeout(() => layout.classList.remove(s.showAnimation), 1000);
    }

    const layout = layoutRef.current;
    if (layout) {
      layout.addEventListener('wheelchange', onWheelChange);

      return () => layout.removeEventListener('wheelchange', onWheelChange);
    }
  }, [layoutRef]);
  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (!isAdmin) {
      router.push("/");
    } else {
      // router.push("/admin");
      setIsLoading(false);
    }
  }, [user, isAdmin, router]);

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className={s.layout} ref={layoutRef}>
      <Navigation />
      {children}
    </div>
  );
}

export default Layout;
