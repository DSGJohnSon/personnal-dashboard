"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";
import { useAuthActions } from "@convex-dev/auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { LuLogOut } from "react-icons/lu";

export default function Page() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const currentUser = useCurrentUser();

  const hour = new Date().getHours();

  return (
    <div className="h-[200vh] px-24 py-48">
      <section className="rounded-md w-full overflow-hidden relative p-64 bg-neutral-50">
        <div className="z-10 relative">
          <h1 className="font-bold text-5xl">
            Bienvenue {currentUser?.data?.name}
          </h1>
          {(hour >= 0 && hour < 6) ||
            (hour >= 22 && hour <= 24 && (
              <p className="flex items-center gap-2">
                <Image
                  src={"/icons/night_with_stars_3d.png"}
                  alt=""
                  width={48}
                  height={48}
                  className="size-6"
                />
                Il n'y a pas d'heure pour gérer sa vie !
              </p>
            ))}
          {hour >= 6 && hour < 8 && (
            <p className="flex items-center gap-2">
              <Image
                src={"/icons/sunset_3d.png"}
                alt=""
                width={48}
                height={48}
                className="size-6"
              />
              Gérer sa vie, dès le premier rayon de soleil !
            </p>
          )}
          {hour >= 8 && hour < 18 && (
            <p className="flex items-center gap-2">
              <Image
                src={"/icons/cityscape_3d.png"}
                alt=""
                width={48}
                height={48}
                className="size-6"
              />
              Et si on optimisait cette journée ?
            </p>
          )}
          {hour >= 18 && hour < 22 && (
            <p className="flex items-center gap-2">
              <Image
                src={"/icons/sunset_3d.png"}
                alt=""
                width={48}
                height={48}
                className="size-6"
              />
              Un peu de gestion et au lit !
            </p>
          )}
        </div>
        <p className="absolute rotate-90 top-1/2 -translate-x-1/2 right-0 font-black text-9xl opacity-10 text-center no-wrap">
          TODAY'S SUMMARY
        </p>
      </section>
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
