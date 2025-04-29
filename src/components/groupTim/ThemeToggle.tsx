import { motion } from "framer-motion";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from "@/context/DarkModeContext";

// interface ThemeToggleProps {
//   darkMode: boolean;
//   setDarkMode: (value: boolean) => void;
// }

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <motion.button
      onClick={() => {
        console.log("Toggling Dark mode to:", !darkMode);
        setDarkMode(!darkMode);
      }}
      className="p-2 rounded-full hover:bg-blue-600 dark:hover:bg-teal-700"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {!darkMode ? (
        // <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        // </svg> // Icon matahari (light mode)
        <div className="w-6 h-6 text-white">
          <FontAwesomeIcon icon={faSun} className="text-2xl" />
        </div>
      ) : (
        // <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        // </svg> // Icon bulan (dark mode)
        <div className="w-6 h-6 text-white">
          <FontAwesomeIcon icon={faMoon} className="text-2xl" />
        </div>
      )}
    </motion.button>
  );
}
