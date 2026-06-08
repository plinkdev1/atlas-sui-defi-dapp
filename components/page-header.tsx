import React from "react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: LucideIcon
  cta?: {
    label: string
    href?: string
    onClick?: () => void
  }
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function PageHeader({ title, description, icon: Icon, cta, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-6 pb-4 border-b border-border/10">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 mb-3 text-xs">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.href ? (
                <a href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-muted-foreground">{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && <span className="text-border">/</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Title Section */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-6 w-6 text-primary flex-shrink-0" />}
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        </div>
        {cta && (
          <Button
            size="sm"
            onClick={cta.onClick}
            asChild={!!cta.href}
            className="flex-shrink-0"
          >
            {cta.href ? <a href={cta.href}>{cta.label}</a> : cta.label}
          </Button>
        )}
      </div>
    </div>
  )
}
