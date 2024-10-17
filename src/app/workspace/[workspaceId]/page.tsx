"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { LuLogOut } from "react-icons/lu";

export default function Page() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const currentUser = useCurrentUser();

  return (
    <div className="h-[200vh] px-24 py-48">
      <h1 className="font-bold text-3xl mb-8">Dashboard</h1>
      {currentUser.data && currentUser.data !== null && (
        <div className="inline-flex items-center gap-8 border border-neutral-200 rounded-md p-4">
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
            onClick={() => signOut().then(() => router.replace("/"))}
          >
            <LuLogOut />
            Logout
          </Button>
        </div>
      )}
      {(currentUser.isLoading || currentUser.data == null) && (
        <div className="inline-flex items-center gap-8 border border-neutral-200 rounded-md p-4">
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
            disabled
          >
            <LuLogOut />
            Logout
          </Button>
        </div>
      )}

      <h1 className="max-w-[500px] mt-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolores
        laboriosam id ipsam quis voluptate laudantium quasi soluta beatae quod
        repudiandae, ad veritatis, vero eos aliquid odio labore modi nisi.
      </h1>
      <h1 className="max-w-[500px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolores
        laboriosam id ipsam quis voluptate laudantium quasi soluta beatae quod
        repudiandae, ad veritatis, vero eos aliquid odio labore modi nisi.
      </h1>
      <h1 className="max-w-[500px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolores
        laboriosam id ipsam quis voluptate laudantium quasi soluta beatae quod
        repudiandae, ad veritatis, vero eos aliquid odio labore modi nisi.
      </h1>
    </div>
  );
}
