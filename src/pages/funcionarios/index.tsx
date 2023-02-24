import Head from "next/head";
import { useState } from "react";
import { Header } from "../../components/Header";

export default function Product() {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const changeMenuActive = () => {
    setMenuActive(!menuActive);
  };
  return (
    <>
      <Head>
        <title>Lista De Produtos - Projeto Pizzaria</title>
      </Head>
      <div>
        <Header changeMenuActive={changeMenuActive} />
      </div>
    </>
  );
}
