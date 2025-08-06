import { cn } from "@/lib/utils";

interface HealthIconProps extends React.SVGProps<SVGSVGElement> {
  status: number; // 0: off, 1: on
}

export function HealthIcon({ status, className, ...props }: HealthIconProps) {
  return (
    <div className={cn("relative", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("transition-all duration-300", status === 1 && "opacity-0")}
        {...props}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke={status ? 'transparent' : 'hsl(var(--muted-foreground))'} />
      </svg>
      {status === 1 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 animate-flame-pulse"
          {...props}
        >
          <defs>
            <filter id="flame-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M21 12a9 9 0 1 1-6.219-8.56"
            stroke="#ff4747"
            filter="url(#flame-glow)"
          />
        </svg>
      )}
    </div>
  );
}
