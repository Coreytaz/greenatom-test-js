"use client"

import React from "react";
import { UseThemeProps } from "./types";

export const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined)

const defaultContext: UseThemeProps = { setTheme: _ => { }, themes: [] }

export const useTheme = () => React.useContext(ThemeContext) ?? defaultContext