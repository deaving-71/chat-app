import { cn } from "@/lib/utils";

//Todo: status should be an enum
type Props = { status: boolean };

export default function StatusDot({ status }: Props) {
  return (
    <span
      className={cn(
        "absolute -bottom-[0.125rem] right-[0.125rem] h-2 w-2 rounded-full",
        status ? "bg-success" : "bg-offline",
      )}
    />
  );
}
