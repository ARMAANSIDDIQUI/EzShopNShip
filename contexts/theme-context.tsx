"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export type Theme = "light" | "dark" | "vibrant" | "minimal" | "festive"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: { value: Theme; label: string; emoji: string }[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const themes = [
  { value: "light" as Theme, label: "Light Pastel", emoji: "🌸" },
  { value: "dark" as Theme, label: "Dark Neon", emoji: "🌙" },
  { value: "vibrant" as Theme, label: "Vibrant Youthful", emoji: "🎉" },
  { value: "minimal" as Theme, label: "Minimal Elegant", emoji: "⚪" },
  { value: "festive" as Theme, label: "Festive Mode", emoji: "🎊" },
]

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("ezshopnship-theme") as Theme
    if (savedTheme && themes.some((t) => t.value === savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("ezshopnship-theme", theme)

    // Remove all theme classes
    document.documentElement.classList.remove("dark", "vibrant", "minimal", "festive")

    // Add current theme class (except for light which is default)
    if (theme !== "light") {
      document.documentElement.classList.add(theme)
    }
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme, themes }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
