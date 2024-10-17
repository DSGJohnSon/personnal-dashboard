"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/useCreateWorkspaceModal";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { LuLoader, LuLogOut } from "react-icons/lu";

export default function Page() {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
      setOpen(false);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen]);

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-8">
      <h1 className="font-bold text-3xl">Bienvenue !</h1>
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
        </div>
      )}
      <div className="flex flex-col items-center gap-4">
        <LuLoader className="animate-spin size-6" />
        Redirection en cours...
      </div>
    </div>
  );
}
