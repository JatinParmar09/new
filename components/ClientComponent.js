import { Inter } from "next/font/google";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function ClientComponent({ children }) {
 return (
    <div className={inter.className}>
      {children}
    </div>
 );
}