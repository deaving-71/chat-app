import { Header, Inbox } from "@/components/direct-messages";

export default function DirectMessages() {
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[auto,1fr]">
        <Header />
        <div className="flex h-full items-center justify-center text-center font-medium">
          Select a conversation or start a new one.
        </div>
      </div>
      <Inbox />
    </>
  );
}
