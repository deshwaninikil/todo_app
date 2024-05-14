const { Login } = require("@/component/Auth/Login");
import Layout from "@/component/Layout/Layout";

const login = () => {
  return (
    <>
      <Layout>
        <Login />
      </Layout>
    </>
  );
};

export default login;
