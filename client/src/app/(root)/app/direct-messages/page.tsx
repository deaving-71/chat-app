import { Header, Inbox } from "@/components/direct-messages";
import { Chat } from "@/components/shared";

export default function DirectMessages() {
  return (
    <div className="lg:grid block grid-cols-[1fr,auto] grid-rows-1">
      <div className="grid grid-rows-[auto,1fr] grid-cols-1">
        <Header />
        <Chat />
      </div>
      <Inbox />
    </div>
  );
}
