import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "online" | "offline" | "warning" | "idle"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    online: {
      label: "Online",
      className: "bg-success-light text-success border-success/20"
    },
    offline: {
      label: "Offline", 
      className: "bg-destructive-light text-destructive border-destructive/20"
    },
    warning: {
      label: "Warning",
      className: "bg-warning-light text-warning-foreground border-warning/20"
    },
    idle: {
      label: "Idle",
      className: "bg-muted text-muted-foreground border-border"
    }
  }

  const config = statusConfig[status]

  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
      config.className,
      className
    )}>
      <div className={cn(
        "mr-1 h-1.5 w-1.5 rounded-full",
        {
          "bg-success": status === "online",
          "bg-destructive": status === "offline", 
          "bg-warning": status === "warning",
          "bg-muted-foreground": status === "idle"
        }
      )} />
      {config.label}
    </span>
  )
}