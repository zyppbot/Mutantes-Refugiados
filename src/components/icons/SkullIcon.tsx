import { cn } from "@/lib/utils";

interface SkullIconProps extends React.SVGProps<SVGSVGElement> {
  status: number; // 0: none, 1: red/flames, 2: dark red/small flames, 3: black
}

export function SkullIcon({ status, className, ...props }: SkullIconProps) {
  const colors = [
    { fill: 'hsl(var(--muted))', stroke: 'hsl(var(--muted-foreground))', flame: 'transparent' }, // 0
    { fill: '#ff4747', stroke: '#ff1f1f', flame: '#ffc300' }, // 1
    { fill: '#c21807', stroke: '#a01405', flame: '#ff8c00' }, // 2
    { fill: '#2e2e2e', stroke: '#1c1c1c', flame: 'transparent' }, // 3
  ];
  const { fill, stroke, flame } = colors[status] || colors[0];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-all duration-300", className)}
      {...props}
    >
      {status === 1 && (
        <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 1.51 1.19 3.12 2.5 3.5.5.15 1.5 1 1.5 1s1-.85 1.5-1c1.31-.38 2.5-1.99 2.5-3.5A4.5 4.5 0 0 0 12 2Z" fill={flame} stroke={flame} />
      )}
      {status === 2 && (
         <path d="M12 4a2.5 2.5 0 0 0-2.5 2.5c0 .84.66 1.73 1.39 1.94.27.08.86.56.86.56s.59-.48.86-.56c.73-.21 1.39-1.1 1.39-1.94A2.5 2.5 0 0 0 12 4Z" fill={flame} stroke={flame} />
      )}
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.3a2 2 0 0 1-1.6-3.2L14.2 1a2 2 0 0 0-3.2 0L10.1 2.8A2 2 0 0 1 8.5 6H5.2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" fill={fill} stroke={stroke} />
      <path d="M8 12h8" stroke={stroke} strokeWidth="3" />
      <path d="M9 16h6" stroke={stroke} strokeWidth="3" />
      <path d="M14.5 9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" fill={status === 3 ? fill : "black"} stroke="none" />
      <path d="M9.5 9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" fill={status === 3 ? fill : "black"} stroke="none" />
    </svg>
  );
}
