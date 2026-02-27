"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Logo } from "./logo";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export const AppHeader = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-15 w-full bg-background/95 backdrop-blur shadow-sm">
      <div className="container flex h-15 items-center justify-between mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Logo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:flex items-center gap-5 h-4 justify-end hidden"
        >
          <Link
            href="#"
            className="font-semibold hover:text-primary text-muted-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#"
            className="font-semibold hover:text-primary text-muted-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="font-semibold hover:text-primary text-muted-foreground transition-colors"
          >
            About
          </Link>
          <Button onClick={() => router.push("/login")} className="rounded-lg">
            Get Started
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:hidden items-center flex"
        >
          <Button size="icon" variant={"ghost"}>
            <Menu className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </header>
  );
};
