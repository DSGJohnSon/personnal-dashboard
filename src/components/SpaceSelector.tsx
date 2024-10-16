import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SpaceSelector({
  isScrolled,
}: {
  isScrolled?: boolean;
}) {
  return (
    <Select>
      <SelectTrigger
        className={cn(
          "w-[250px]",
          "transition-all duration-500",
          isScrolled ? "h-8 px-2" : ""
        )}
      >
        <SelectValue placeholder="Sélectionnez un espace" />
      </SelectTrigger>
      <SelectContent className="w-[250px]">
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-3 h-3  rounded-full aspect-square",
                  "bg-neutral-900",
                  "dark:bg-neutral-700"
                )}
              ></div>
              <span className="truncate">Personnal</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
