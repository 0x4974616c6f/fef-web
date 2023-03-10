import { Container, Grid } from "@mui/material";
import Layout from "../../components/admin/Layout";
import s from "./styles.module.scss";

const Admin = () => {
  return (
    <Layout>
      <Container className={s.container} maxWidth="xl">
        <h1>DashBoard</h1>
      </Container>
    </Layout>
  );
};

export default Admin;
