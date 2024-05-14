import { Inter } from "next/font/google";

import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Created by Nikil Deshwani",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
