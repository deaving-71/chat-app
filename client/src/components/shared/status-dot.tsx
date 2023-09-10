import { cn } from "@/lib/utils";

//Todo: status should be an enum
type Props = { status: string };

export default function StatusDot({ status }: Props) {
  return (
    <span
      className={cn(
        "w-2 h-2 rounded-full absolute -bottom-[0.125rem] right-[0.125rem]",
        status === "on" ? "bg-success" : "bg-offline"
      )}
    />
  );
}
