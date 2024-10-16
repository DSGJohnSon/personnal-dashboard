"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const { signIn } = useAuthActions();
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 max-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[450px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Commencez à vous projeter !</h1>
            <p className="text-muted-foreground">
              Rejoignez le club en vous connectant avec votre compte GitHub ou
              Google.
            </p>
          </div>
          <div className="grid gap-4">
            <Button
              variant="google"
              className="w-full"
              onClick={() => void signIn("google")}
              disabled>
              <FcGoogle className="size-5" />
              Login with Google
            </Button>
            <Button
              variant="github"
              className="w-full"
              onClick={() => void signIn("github")}>
              <FaGithub className="size-5" />
              Login with Github
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder-auth.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
