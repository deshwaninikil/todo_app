// import Image from "next/image";
// import "./page.module.css";
// import { Header } from "../component/Header/Header";
import Layout from "@/component/Layout/Layout";
import { Login } from "@/component/Auth/Login";
// import { Container } from "@/component/Container/Container";
// import { Footer } from "../component/Footer/Footer";

export default function Home() {
  return (
    <>
      <Layout>
        <Login />
        {/* <Container/> */}
      </Layout>
    </>
  );
}
