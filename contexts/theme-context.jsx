"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Sun, Moon, Sparkles, Feather, Circle } from "lucide-react"

const ThemeContext = createContext(undefined)

export const themes = [
  { value: "dark", label: "Dark Neon", color: "text-yellow-400", icon: Moon },
  { value: "light", label: "Light Pastel", color: "text-rose-400", icon: Sun },
  { value: "vibrant", label: "Vibrant Youthful", color: "text-purple-500", icon: Sparkles },
  { value: "minimal", label: "Minimal Elegant", color: "text-gray-500", icon: Circle },
  { value: "festive", label: "Festive Mode", color: "text-red-500", icon: Feather },
]

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("ezshopnship-theme")
    if (savedTheme && themes.some((t) => t.value === savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("ezshopnship-theme", theme)

    // First, remove all possible theme classes
    document.documentElement.classList.remove("light", "vibrant", "minimal", "festive", "dark")

    // Then, add the current theme class
    document.documentElement.classList.add(theme)
    
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
