"use client"

import { useTheme } from '@/shared/lib'
import { Button, ButtonProps } from '@/shared/ui'
import { MoonIcon, SunIcon } from 'lucide-react'
import React, { FC } from 'react'

interface ToggleThemeProps extends ButtonProps { }

export const ToggleTheme: FC<ToggleThemeProps> = (props) => {
    const { setTheme, theme, systemTheme } = useTheme()

    const toggleTheme = (theme: 'dark' | "light") => theme === "dark" ? "light" : "dark"

    const onToggleTheme = () => {
        if (theme === "system") {
            setTheme(toggleTheme(systemTheme))
        } else {
            setTheme(toggleTheme(theme as 'dark' | "light"))
        }
    }

    return (
        <Button onClick={onToggleTheme} variant="outline" size="icon" {...props}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Переключить тему</span>
        </Button>
    )
}
