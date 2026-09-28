import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

/* Box mascot SVG illustration */
function BoxMascot() {
  return (
    <svg width="110" height="130" viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Shadow */}
      <ellipse cx="55" cy="126" rx="32" ry="5" fill="#e2e8f0" />
      {/* Body - cardboard box */}
      <rect x="18" y="48" width="74" height="66" rx="8" fill="#fef3c7" />
      <rect x="18" y="48" width="74" height="66" rx="8" stroke="#fcd34d" strokeWidth="2" />
      {/* Box fold lines */}
      <line x1="55" y1="48" x2="55" y2="114" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="18" y1="81" x2="92" y2="81" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Box flap top */}
      <path d="M18 48 L30 28 L80 28 L92 48 Z" fill="#fde68a" stroke="#fcd34d" strokeWidth="2" />
      <line x1="55" y1="28" x2="55" y2="48" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* BoxBuddy label */}
      <rect x="28" y="58" width="54" height="18" rx="4" fill="#10B981" />
      <text x="55" y="71" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" letterSpacing="0.5">BOXBUDDY</text>
      {/* Face */}
      {/* Eyes */}
      <circle cx="40" cy="92" r="6" fill="white" stroke="#0f2342" strokeWidth="1.5" />
      <circle cx="70" cy="92" r="6" fill="white" stroke="#0f2342" strokeWidth="1.5" />
      <circle cx="41.5" cy="91" r="2.5" fill="#0f2342" />
      <circle cx="71.5" cy="91" r="2.5" fill="#0f2342" />
      {/* Eye shine */}
      <circle cx="42.5" cy="89.5" r="1" fill="white" />
      <circle cx="72.5" cy="89.5" r="1" fill="white" />
      {/* Smile */}
      <path d="M42 103 Q55 112 68 103" stroke="#0f2342" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Rosy cheeks */}
      <circle cx="35" cy="100" r="5" fill="#fca5a5" opacity="0.5" />
      <circle cx="75" cy="100" r="5" fill="#fca5a5" opacity="0.5" />
      {/* Arms */}
      <path d="M18 70 Q8 65 6 72 Q8 80 18 78" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5" />
      <path d="M92 70 Q102 65 104 72 Q102 80 92 78" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5" />
      {/* Legs/feet */}
      <rect x="30" y="112" width="18" height="12" rx="4" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5" />
      <rect x="62" y="112" width="18" height="12" rx="4" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5" />
    </svg>
  );
}

export function EmptyState({ icon: Icon, title, description, children, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="mb-5">
        <BoxMascot />
      </div>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-2xl mb-3"
        style={{ background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", border: "1px solid #bae6fd" }}
      >
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-slate-500 max-w-xs leading-relaxed">{description}</p>
      )}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
