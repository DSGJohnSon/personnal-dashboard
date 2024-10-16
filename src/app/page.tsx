"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";
import { useAuthActions } from "@convex-dev/auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const currentUser = useCurrentUser();

  return (
    <main className="flex flex-col gap-8 items-center min-h-screen p-24">
      hello world{" "}
      <Button variant={"default"} size={"lg"} asChild>
        <Link href={"/login"} title="Go to login button">
          Go to login page
        </Link>
      </Button>
      <h2>Utilisateur connecté :</h2>
      {currentUser.data && currentUser.data !== null && (
        <div className="flex items-center gap-8 border border-zinc-200 rounded-md p-4">
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src={currentUser.data?.image} alt="Avatar" />
              <AvatarFallback>
                {currentUser.data?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {currentUser.data?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentUser.data?.email}
              </p>
            </div>
          </div>
          <Button
            variant={"outline"}
            size={"lg"}
            onClick={() => signOut().then(() => router.replace("/"))}>
            <LuLogOut />
            Logout
          </Button>
        </div>
      )}
      {(currentUser.isLoading || currentUser.data == null) && (
        <div className="flex items-center gap-8 border border-zinc-200 rounded-md p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="grid gap-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
          <Button
            variant={"outline"}
            size={"lg"}
            onClick={() => signOut().then(() => router.replace("/"))}
            disabled>
            <LuLogOut />
            Logout
          </Button>
        </div>
      )}
    </main>
  );
}
