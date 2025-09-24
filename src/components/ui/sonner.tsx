"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  // Get theme from document class
  const isDark = document.documentElement.className.includes('dark') || 
                 !document.documentElement.className.includes('light');

  return (
    <Sonner
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--surface)",
          "--normal-text": "var(--text)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--accent)",
          "--success-text": "var(--bg)",
          "--error-bg": "#ef4444",
          "--error-text": "var(--text)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };