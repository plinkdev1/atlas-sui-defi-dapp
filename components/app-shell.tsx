"use client"

import React from "react"

interface AppShellProps {
  children: React.ReactNode
  header: React.ReactNode
  leftSidebar?: React.ReactNode
  rightSidebar?: React.ReactNode
  footer?: React.ReactNode
}

/**
 * AppShell - 3-column dashboard layout for desktop, single column for mobile
 * Desktop: [260px left sidebar] [flex-1 center content] [320px right sidebar]
 * Top: Full-span header (72px)
 * Mobile: Single column with hidden sidebars
 */
export function AppShell({
  children,
  header,
  leftSidebar,
  rightSidebar,
  footer,
}: AppShellProps) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
      {/* Full-span header */}
      <div className="flex-shrink-0 border-b border-border/10 bg-background/80 backdrop-blur-xl">
        {header}
      </div>

      {/* 3-column layout container */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left Sidebar - Desktop only */}
        {leftSidebar && (
          <aside className="hidden lg:flex flex-shrink-0 w-60 bg-card/30 backdrop-blur-sm border-r border-border/10 flex-col overflow-y-auto">
            {leftSidebar}
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col pb-20 md:pb-0">
          <div className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </div>

          {/* Footer scrolls with content */}
          {footer && (
            <div className="flex-shrink-0">
              {footer}
            </div>
          )}
        </main>

        {/* Right Sidebar - Desktop only */}
        {rightSidebar && (
          <aside className="hidden lg:flex flex-shrink-0 w-80 bg-card/30 backdrop-blur-sm border-l border-border/10 flex-col overflow-y-auto">
            {rightSidebar}
          </aside>
        )}
      </div>
    </div>
  )
}
