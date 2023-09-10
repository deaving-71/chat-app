import { Button } from "../ui/";

export default function Tabs() {
  return (
    <div className="lg:flex hidden items-center justify-between p-8">
      <div className="flex items-center gap-2">
        {["All", "Online", "Pending", "Offline"].map((tab, idx) => (
          <Button key={tab + idx}>{tab}</Button>
        ))}
      </div>
      <Button>Add Friend</Button>
    </div>
  );
}
