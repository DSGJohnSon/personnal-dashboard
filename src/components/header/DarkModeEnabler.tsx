"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LuMoonStar, LuSun } from "react-icons/lu";

export default function DarkModeEnabler() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  //Initialiser l'état du dark mode au chargement du composant
  useEffect(() => {
    setIsDarkMode(document.body.classList.contains("dark"));
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"iconSm"}>
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
  );
}
