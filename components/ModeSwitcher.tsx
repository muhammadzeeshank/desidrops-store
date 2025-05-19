"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"
import { META_THEME_COLORS } from "@/config/site"
import { useMetaColor } from "@/hooks/UseMetaColor"

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const { setMetaColor } = useMetaColor()

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark
    )
  }, [resolvedTheme, setTheme, setMetaColor])

  return (
    <Button
      variant="ghost"
      className="group/toggle h-10 w-10 px-0 cursor-pointer"
      onClick={toggleTheme}
    >
      <SunIcon className="text-foreground/70 hidden [html.dark_&]:block" />
      <MoonIcon className="text-foreground/70 hidden [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}