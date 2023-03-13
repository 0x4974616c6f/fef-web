import { Container, Grid } from "@mui/material";
import Layout from "../../../components/admin/Layout";
import ListMonetario from "../../../components/admin/ListMonetario";
import { IMoney } from "../../../interfaces/money.interface";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import s from "./styles.module.scss";

interface Props {
  money: IMoney[];
}

const Money = ({ money }: Props) => {
  return (
    <Layout>
      <Container className={s.container} maxWidth="xl">
        <h1>Monetário</h1>
        <ListMonetario data={money} />
      </Container>
    </Layout>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = await setupAPIClient(ctx);
  const response = await apiClient.get("/money/all");
  return {
    props: {
      money: response.data,
    },
  };
});

export default Money;
