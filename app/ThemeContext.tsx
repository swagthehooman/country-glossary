'use client'

import { createContext, useState } from "react";

export const ThemeContext = createContext<Boolean | any>(null)

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<Boolean>(false)

    return <ThemeContext.Provider value={{ mode, setMode }}>
        {children}
    </ThemeContext.Provider>
}