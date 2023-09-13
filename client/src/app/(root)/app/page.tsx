import { Header, Tabs, FriendsList } from "@/components/friends";
import FriendProfileInfo from "@/components/friends/friend-profile-info";

export default function App() {
  return (
    <div className="lg:grid block grid-cols-[1fr,auto] grid-rows-1">
      <div className="grid grid-rows-[auto,1fr] grid-cols-1 max-h-screen">
        <Header />
        <main className="overflow-y-auto">
          <Tabs />
          <FriendsList />
        </main>
      </div>
      <FriendProfileInfo />
    </div>
  );
}
