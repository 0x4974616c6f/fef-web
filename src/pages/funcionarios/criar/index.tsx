import Head from "next/head";
import { useState } from "react";
import { EmployeeType } from "..";
import EmployeeForm from "../../../components/employeeForm";
import { Header } from "../../../components/Header";
import styles from "./styles.module.scss";

const CreateEmployee = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const changeMenuActive = () => {
    setMenuActive(!menuActive);
  };

  const handleSubmit = (employee: EmployeeType): void => {
    // lógica para enviar os dados do formulário para o servidor
    console.log(employee);
  };
  return (
    <>
      <Head>
        <title>Ferrinox - Criar Novo Funcionário</title>
      </Head>
      <div>
        <Header changeMenuActive={changeMenuActive} />
      </div>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Cadastre Novo funcionário</h1>
        </div>
        <div className={styles.containerForm}>
          <EmployeeForm onSubmit={handleSubmit} />
        </div>
      </main>
    </>
  );
};

export default CreateEmployee;
