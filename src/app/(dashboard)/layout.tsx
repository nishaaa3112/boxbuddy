import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full" style={{ background: "#080f1d" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-16">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6" style={{ background: "#080f1d" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
