import { Anchor } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Brand panel */}
      <div
        className="hidden lg:flex flex-col justify-between relative overflow-hidden p-12"
        style={{ background: "linear-gradient(160deg,#061428 0%,#0f2342 40%,#0a2e1e 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle,#10B981,transparent 70%)" }} />
        <div className="absolute bottom-20 -left-20 h-56 w-56 rounded-full opacity-8" style={{ background: "radial-gradient(circle,#1a4a8a,transparent 70%)" }} />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg,#059669,#10B981)", boxShadow: "0 4px 16px rgba(16,185,129,0.35)" }}
          >
            <Anchor className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">BoxBuddy</span>
        </div>

        {/* Quote */}
        <div className="relative space-y-6">
          <p className="text-white/90 text-xl font-medium leading-relaxed">
            &ldquo;Streamline your global trade operations with AI-powered insights and real-time shipment visibility.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}
            >
              N
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Neelu Suthar</p>
              <p className="text-slate-400 text-xs">Operations Director</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-6">
          {[
            { value: "10K+", label: "Shipments Tracked" },
            { value: "98%",  label: "On-Time Delivery"  },
            { value: "50+",  label: "Countries Served"  },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-emerald-400">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Form area */}
      <div className="flex items-center justify-center p-8" style={{ background: "#080f1d" }}>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg,#059669,#10B981)" }}
            >
              <Anchor className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">BoxBuddy</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
