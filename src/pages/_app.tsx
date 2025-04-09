// import "@/styles/globals.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  return <Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />;
}
