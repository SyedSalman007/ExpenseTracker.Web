import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="relative ml-64 flex h-screen flex-col">
        <TopBar />
        <section className="flex-grow overflow-y-auto p-lg">{children}</section>
      </main>
    </div>
  );
}
