import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export default function Layout({ children }) {
  return (
    <main className="App">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
