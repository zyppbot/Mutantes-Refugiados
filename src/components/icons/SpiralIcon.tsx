import { cn } from "@/lib/utils";

interface SpiralIconProps extends React.SVGProps<SVGSVGElement> {
  status: number; // 0: none, 1: blue, 2: teal
}

export function SpiralIcon({ status, className, ...props }: SpiralIconProps) {
  const colors = [
    { stroke: 'hsl(var(--muted-foreground))' }, // 0: none
    { stroke: '#000080' }, // 1: navy blue
    { stroke: '#008080' }, // 2: teal
  ];
  const { stroke } = colors[status] || colors[0];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-all duration-300", className)}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke={stroke} />
    </svg>
  );
}
