import Head from "next/head";
import { useState } from "react";
import { Header } from "../../../components/Header";

const CreateEmployee = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const changeMenuActive = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
      <Head>
        <title>Ferrinox - Criar Novo Funcionário</title>
      </Head>
      <div>
        <Header changeMenuActive={changeMenuActive} />
      </div>
    </>
  );
};

export default CreateEmployee;
