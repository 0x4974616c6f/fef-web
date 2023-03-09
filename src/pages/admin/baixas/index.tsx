import { Container, Grid } from "@mui/material";
import Layout from "../../../components/admin/Layout";
import s from "./styles.module.scss";

const Baixas = () => {
  return (
    <Layout>
      <Container className={s.container} maxWidth="xl">
        <h1>Baixas</h1>
      </Container>
    </Layout>
  );
};

export default Baixas;
