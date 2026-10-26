/** Sur-titre technique : repère « + », filet, puis libellé en chasse fixe. */
export default function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 text-muted ${className}`}>
      <span aria-hidden className="text-base leading-none text-bone/50">+</span>
      <span aria-hidden className="h-px w-8 bg-bone/30" />
      {children}
    </p>
  );
}
