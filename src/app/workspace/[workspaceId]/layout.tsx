"use client";

import Header from "@/components/header/Header";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export default function Layout({ children }: { children: React.ReactNode }) {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });

  return (
    <>
      <Header />
      <p className="mt-16">{workspaceId}</p>
      <p>{JSON.stringify(data)}</p>
      <main>{children}</main>
    </>
  );
}
