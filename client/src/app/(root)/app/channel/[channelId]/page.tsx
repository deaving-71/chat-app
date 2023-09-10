import { Header, Members } from "@/components/channel";
import { Chat } from "@/components/shared";

type Props = {};

export default function Channel({}: Props) {
  return (
    <div className="grid grid-cols-[1fr,auto] grid-rows-1">
      <div className="flex flex-col h-screen">
        <Header />
        <Chat className="flex-1" />
      </div>
      <Members />
    </div>
  );
}
