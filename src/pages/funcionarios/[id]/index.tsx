import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import EmployeeFormEdit, {
  EmployeeFormInputs,
} from "../../../components/employeeFormEdit";
import { Header } from "../../../components/Header";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import styles from "./styles.module.scss";

const CreateEmployee = ({ employeeGetOne }) => {
  const router = useRouter();
  const { id } = router.query;
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
        <title>Ferrinox - Edição Funcionário</title>
      </Head>
      <div>
        <Header changeMenuActive={changeMenuActive} />
      </div>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Edite o funcionário</h1>
        </div>
        <div className={styles.containerForm}>
          <EmployeeFormEdit data={employeeGetOne} onSubmit={handleSubmit} />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const id = ctx.req.url.split("/")[2];
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`/employees/${id}`);

  return {
    props: {
      employeeGetOne: response.data,
    },
  };
});

export default CreateEmployee;
