import ThemeToggle from "@/components/groupTim/ThemeToggle";
import Image from "next/image";
import logo from "../../public/assets/fifa-wc-2026.svg";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

interface NavbarPageProps {
  tournamentName: string;
}

const NavbarPage: React.FC<NavbarPageProps> = ({ tournamentName }) => {
  const router = useRouter();
  return (
    <div className="container mx-auto flex justify-between items-center h-15 sm:h-20">
      <div className="flex items-center justify-center gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
          <Image src={logo} alt="FIFA World Cup 2026" width={48} height={48} className="w-6 h-auto ml-2 sm:w-10" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <Link href="/" className={`relative font-bold transition-all ${router.pathname === "/" ? "text-white" : "hover:text-white text-stone-300"} text-sm font-bold sm:text-xl md:text-2xl uppercase`}>
            {tournamentName}
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
          <Link href="/knockout" className={`relative font-bold transition-all ${router.pathname === "/knockout" ? "text-white" : "hover:text-white text-stone-300"} text-sm font-bold sm:text-xl md:text-2xl uppercase`}>
            knockout
          </Link>
        </motion.div>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default NavbarPage;
