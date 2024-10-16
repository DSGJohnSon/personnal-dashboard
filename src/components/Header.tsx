"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LuHelpCircle, LuHelpingHand, LuMoonStar, LuSun } from "react-icons/lu";
import SpaceSelector from "./SpaceSelector";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  //Initialiser l'état du dark mode au chargement du composant
  useEffect(() => {
    setIsDarkMode(document.body.classList.contains("dark"));
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-500",
        isScrolled
          ? "bg-background/50 backdrop-blur-sm py-2 px-4"
          : "bg-transparent py-4 px-8"
      )}
    >
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Image
            src={"/logo-icon.svg"}
            alt="Logo Syncra"
            className={cn(
              "transition-all duration-500",
              isScrolled ? "w-6 h-6" : "w-8 h-8"
            )}
            width={50}
            height={50}
          ></Image>
          <Link
            href={"/"}
            title="Retour au dashboard"
            className="font-bold text-lg"
          >
            Syncra™
          </Link>
        </div>
        <SpaceSelector isScrolled={isScrolled} />
        <nav>
          <ul className="flex gap-2">
            <li>
              <Button
                variant={"link"}
                className={cn(
                  "flex items-center gap-2",
                  "text-neutral-900/70 hover:text-neutral-900",
                  "dark:text-neutral-100 dark:hover:text-neutral-50",
                  "transition-all duration-500",
                  pathname.includes("/dashboard")
                    ? "text-primary underline"
                    : "hover:no-underline"
                )}
                asChild
              >
                <Link href="/dashboard" title="Accueil">
                  Dashboard
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant={"link"}
                className={cn(
                  "flex items-center gap-2",
                  "text-neutral-900/70 hover:text-neutral-900",
                  "dark:text-neutral-100 dark:hover:text-neutral-50",
                  "transition-all duration-500",
                  pathname.includes("/projets")
                    ? "text-primary underline"
                    : "hover:no-underline"
                )}
                asChild
              >
                <Link href="/projets" title="Accueil">
                  Projets
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant={"link"}
                className={cn(
                  "flex items-center gap-2",
                  "text-neutral-900/70 hover:text-neutral-900",
                  "dark:text-neutral-100 dark:hover:text-neutral-50",
                  "transition-all duration-500",
                  pathname.includes("/listes")
                    ? "text-primary underline"
                    : "hover:no-underline"
                )}
                asChild
              >
                <Link href="/listes" title="Accueil">
                  Listes
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant={"link"}
                className={cn(
                  "flex items-center gap-2",
                  "text-neutral-900/70 hover:text-neutral-900",
                  "dark:text-neutral-100 dark:hover:text-neutral-50",
                  "transition-all duration-500",
                  pathname.includes("/budgets")
                    ? "text-primary underline"
                    : "hover:no-underline"
                )}
                asChild
              >
                <Link href="/budgets" title="Accueil">
                  Budgets
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={"outline"}
          size={"sm"}
          className="inline-flex items-center gap-2"
        >
          <LuHelpCircle className="size-4" />
          Aide
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={"outline"}
              size={"iconSm"}
            >
              {isDarkMode ? (
                <LuMoonStar className="size-4" />
              ) : (
                <LuSun className="size-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thème</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                //Toggle Body class "dark"
                document.body.classList.remove("dark");
                setIsDarkMode(false);
              }}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                //Toggle Body class "dark"
                document.body.classList.add("dark");
                setIsDarkMode(true);
              }}
            >
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
