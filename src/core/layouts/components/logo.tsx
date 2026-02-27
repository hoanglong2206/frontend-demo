"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center overflow-hidden transition-opacity hover:opacity-75"
    >
      <div className="items-center justify-start flex">
        <Image src="/logo.png" alt="Logo" width={32} height={32} priority />
      </div>
      <motion.span
        initial={false}
        animate={{
          maxWidth: 120,
          opacity: 1,
          marginLeft: 8,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="text-xl font-medium whitespace-nowrap overflow-hidden inline-block"
      >
        <span className="text-primary">NOBLEE</span> APP
      </motion.span>
    </Link>
  );
};
