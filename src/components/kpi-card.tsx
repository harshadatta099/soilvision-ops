import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: ReactNode
  className?: string
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon, 
  className 
}: KPICardProps) {
  const changeColors = {
    positive: "text-success",
    negative: "text-destructive", 
    neutral: "text-muted-foreground"
  }

  return (
    <Card className={cn("border-card-border bg-gradient-surface shadow-custom-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <p className={cn("text-xs", changeColors[changeType])}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  )
}