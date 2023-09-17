import { Header, Tabs, FriendsList } from "@/components/friends";
import FriendProfileInfo from "@/components/friends/friend-profile-info";

export default function App() {
  return (
    <div className="block grid-cols-[1fr,auto] grid-rows-1 lg:grid">
      <div className="grid max-h-screen grid-cols-1 grid-rows-[auto,1fr]">
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
