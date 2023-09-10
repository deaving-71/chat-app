import { ThreeDots } from "@/lib/utils/icons";
import Image from "next/image";

type Props = { name: string };

export default function Message({ name }: Props) {
  return (
    <div className="flex px-8 py-2 hover:bg-muted transition-all group">
      <Image
        src={"/assets/default_avatar.png"}
        alt="Profile Avatar"
        width={36}
        height={36}
        className="rounded-full object-contain mr-4 w-9 h-9 inline-block"
      />
      <div>
        <div className="flex items-center justify-between">
          <div className="align-middle">
            <span className="font-medium mr-2">{name}</span>
            <span className="text-xs text-foreground-secondary">9:03</span>
          </div>
          <button className="invisible group-hover:visible">
            <ThreeDots />
          </button>
        </div>
        <p className="block text-sm text-foreground-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          eum voluptatibus quaerat deserunt. Animi, quisquam earum! Suscipit
          corrupti odio fuga similique laudantium cumque perspiciatis,
          reprehenderit doloribus laboriosam aliquam! Impedit, quas.
        </p>
      </div>
    </div>
  );
}
