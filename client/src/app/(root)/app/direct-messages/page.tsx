import { Header, Inbox } from "@/components/direct-messages";

export default function DirectMessages() {
  return (
    <>
      <div className="grid grid-rows-[auto,1fr] grid-cols-1">
        <Header />
        <div className="flex justify-center items-center text-center font-medium h-full">
          Select a conversation or start a new one.
        </div>
      </div>
      <Inbox />
    </>
  );
}
