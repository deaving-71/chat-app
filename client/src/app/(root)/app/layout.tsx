export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="block h-full grid-cols-[1fr,auto] grid-rows-1 lg:grid">
      {children}
    </div>
  );
}
