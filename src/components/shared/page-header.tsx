import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  /** Optional emoji or icon label shown as a pill before the title */
  tag?: string;
}

export function PageHeader({ title, description, children, className, tag }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between", className)}>
      <div>
        {tag && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full mb-2 uppercase tracking-wider">
            {tag}
          </span>
        )}
        <h1 className="text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 shrink-0 mt-0.5">{children}</div>
      )}
    </div>
  );
}
