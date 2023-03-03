import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import EmployeeForm, {
  EmployeeFormInputs,
} from "../../../components/employeeForm";
import { Header } from "../../../components/Header";
import { setupAPIClient } from "../../../services/api";
import styles from "./styles.module.scss";

const CreateEmployee = () => {
  const router = useRouter();
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const changeMenuActive = () => {
    setMenuActive(!menuActive);
  };

  const handleSubmit = async (employee: EmployeeFormInputs): Promise<void> => {
    const apiClient = setupAPIClient();
    await apiClient.post("/employees", employee);
    router.back();
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
