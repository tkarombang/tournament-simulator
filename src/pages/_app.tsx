// import "@/styles/globals.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { DarkModeProvider } from "@/context/DarkModeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <Component {...pageProps} />
    </DarkModeProvider>
  );
}
