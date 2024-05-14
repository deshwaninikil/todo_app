const { SignUpPage } = require("@/component/Auth/SignUp");
import Layout from "@/component/Layout/Layout";

const signup = () => {
  return (
    <>
      <Layout>
        <SignUpPage />
      </Layout>
    </>
  );
};

export default signup;
