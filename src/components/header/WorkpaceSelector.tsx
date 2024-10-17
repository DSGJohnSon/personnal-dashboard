import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useRouter } from "next/navigation";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/useCreateWorkspaceModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LuChevronsDownUp, LuChevronsUpDown, LuLoader, LuPlus } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

export default function WorkspaceSelector() {
  const router = useRouter();
  const [_open, setOpen] = useCreateWorkspaceModal();
  const workspaceId = useWorkspaceId();

  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  const filteredWorkspaces = workspaces?.filter((w) => w._id !== workspaceId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-[250px] justify-between"
        >
          <div className="flex items-center gap-2">
            {workspaceLoading ? (
              <LuLoader className="size-3 animate-spin" />
            ) : (
              <>
                <div
                  className={cn(
                    "block size-3 rounded-full bg-gradient-to-tr",
                    `${workspace?.color + "-workspace-gradient"}`
                  )}
                ></div>
                {workspace?.name}
              </>
            )}
          </div>
          <LuChevronsUpDown className="size-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-[250px]">
        <DropdownMenuLabel>
          <p>{workspace?.name}</p>
          <p className="text-sm font-normal opacity-50">Espace selectionné</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filteredWorkspaces?.map((w) => (
          <DropdownMenuItem
            key={w._id}
            className="cursor-pointer"
            onClick={() => {
              router.push(`/workspace/${w._id}`);
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "block size-3 rounded-full bg-gradient-to-tr",
                  `${w.color + "-workspace-gradient"}`
                )}
              ></div>
              {w.name}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <div className="flex items-center gap-2">
            <LuPlus className="size-3" />
            Créer un espace
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
