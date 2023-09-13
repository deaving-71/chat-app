export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:grid block grid-cols-[1fr,auto] grid-rows-1 h-full">
      {children}
    </div>
  );
}
