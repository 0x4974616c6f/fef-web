import Head from "next/head";
import { useEffect, useState } from "react";
import { FiPlus, FiRefreshCcw } from "react-icons/fi";
import EmployeeList from "../../components/employeelist";
import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";

export type EmployeeType = {
  _id: string;
  updatedAt: string;
  salary: number;
  reasonForTheDismissal: string;
  createdAt: string;
  position: string;
  photo: string;
  phone: string;
  performanceEvaluations: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  dateOfAdmission: string;
  dateOfDismissal?: string;
  address: string;
};

interface EmployeeProps {
  employees: EmployeeType[];
}

export default function Product({ employees }: EmployeeProps) {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [employeesData, setEmployeesData] = useState<EmployeeType[]>(
    employees || []
  );
  const [hydrated, setHydrated] = useState<boolean>(false);

  const changeMenuActive = () => {
    setMenuActive(!menuActive);
  };

  const handleRefreshEmployees = async () => {
    const apiClient = setupAPIClient();
    const response = await apiClient.get("/employees");
    setEmployeesData(response.data);
  };

  const handleAddPage = () => {};

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Ferrinox - Lista De Funcionários</title>
      </Head>
      <div>
        <Header changeMenuActive={changeMenuActive} />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Lista de funcionários</h1>
            <button onClick={handleRefreshEmployees}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
            <button onClick={handleAddPage}>
              <FiPlus size={25} color="#3fffa3" />
            </button>
          </div>
          <article className={styles.listOrders}>
            {employeesData.length === 0 ? (
              <span className={styles.emptyList}>
                Nenhum funcionário foi cadastrado...
              </span>
            ) : (
              <EmployeeList
                employees={employeesData}
                onFetchData={handleRefreshEmployees}
              />
            )}
          </article>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/employees");
  return {
    props: {
      employees: response.data,
    },
  };
});
