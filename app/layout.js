import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { AuthProvider } from "./context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Created by Nikil Deshwani",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
