"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/useCreateWorkspaceModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { tailwindColors } from "@/datas/tailwind-colors";

export default function CreateWorkspaceModal() {
  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState("");
  const [color, setColor] = useState("neutral");

  const router = useRouter();

  const { mutate, isPending } = useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name, color },
      {
        onSuccess(id) {
          handleClose();
          router.push(`/workspace/${id}`);
          toast({
            title: `Espace "${name}" créé avec succès`,
            description:
              "Vous allez être redirigé directement vers votre espace.",
          });
        },
        onError(error) {
          alert(
            "Une erreur est survenue lors de la création de l'espace :" + error
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pour commencer, créez un espace</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Vous ne faites actuellement parti d'aucun espace. Créez un espace pour
          commencer à utiliser l'application.
        </DialogDescription>
        <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <Select
              value={color}
              onValueChange={(e) => {
                setColor(e);
              }}
              disabled={isPending}
              required
            >
              <SelectTrigger className="w-auto gap-2">
                <div
                  className={cn(
                    "block size-5 rounded-full bg-gradient-to-tr",
                    `${color + "-workspace-gradient"}`
                  )}
                ></div>
              </SelectTrigger>
              <SelectContent className="w-auto">
                {tailwindColors.map((color) => (
                  <SelectItem key={color} value={color}>
                      <div
                        className={cn(
                          "block size-6 rounded-full bg-gradient-to-tr",
                          `${color}-workspace-gradient`
                        )}
                      ></div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              required
              autoFocus
              minLength={3}
              placeholder="Nom de votre espace (ex: 'Personnel', 'Famille', etc.)"
              className="w-full"
            />
          </div>
          <Button
            variant={"default"}
            size={"lg"}
            disabled={isPending}
            className="w-full"
          >
            Créer et rejoindre votre espace
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
