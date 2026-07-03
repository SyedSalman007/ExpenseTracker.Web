import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="relative flex h-screen flex-col lg:ml-64">
        <TopBar />
        <section className="flex-grow overflow-y-auto p-md pb-24 lg:p-lg lg:pb-lg">
          {children}
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
