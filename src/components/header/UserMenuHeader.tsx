import { useCurrentUser } from "@/features/auth/api/useCurrentUser";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LuLogOut } from "react-icons/lu";

export default function UserMenuHeader() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const currentUser = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="hidden h-9 w-9 sm:flex">
          <AvatarImage src={currentUser.data?.image} alt="Avatar" />
          <AvatarFallback>{currentUser.data?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.data?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentUser.data?.email}
              {currentUser.data?.phone}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            signOut().then(() => {
              window.location.reload();
            });
          }}
        >
          <LuLogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
