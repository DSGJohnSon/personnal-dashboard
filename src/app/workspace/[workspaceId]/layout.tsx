"use client";

import Header from "@/components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
