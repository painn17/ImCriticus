import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import { signInWithToken } from "./utils/firebase/firebaseAuth";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full mx-auto container py-4">
        <Navigation />

        {children}
      </body>
    </html>
  );
}