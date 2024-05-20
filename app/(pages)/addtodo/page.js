import { Container } from "@/component/Container/Container";
import Layout from "@/component/Layout/Layout";
import ProtectedRoute from "../ProtectedRoute";

const login = () => {
  return (
    <>
      <ProtectedRoute>
        <Layout>
          <Container />
        </Layout>
      </ProtectedRoute>
    </>
  );
};

export default login;
