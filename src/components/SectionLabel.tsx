export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-primary font-medium">
      <span className="w-6 h-px bg-primary" />
      {children}
    </div>
  );
}
