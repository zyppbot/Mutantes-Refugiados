import { cn } from "@/lib/utils";

interface FatigueIconProps extends React.SVGProps<SVGSVGElement> {
  status: number; // 0: off, 1: on
}

export function FatigueIcon({ status, className, ...props }: FatigueIconProps) {
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
        className="transition-all duration-300"
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
          className="absolute inset-0 animate-rgb-pulse"
          {...props}
        >
          <defs>
            <linearGradient id="fatigueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00BFFF', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#20B2AA', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke="url(#fatigueGradient)" />
        </svg>
      )}
    </div>
  );
}
