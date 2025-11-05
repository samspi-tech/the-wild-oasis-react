import { toggleTheme } from '@/utils/helpers';
import { useState, createContext, type ReactNode, useEffect } from 'react';

type ThemeContextValues = {
    isDarkMode: boolean;
    handleToggleDarkMode: () => void;
};

type ThemeContextProviderProps = {
    children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextValues | null>(null);

export function ThemeProvider({ children }: ThemeContextProviderProps) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const theme = localStorage.getItem('theme');
        const currTheme: string = theme ? JSON.parse(theme) : 'dark';

        return currTheme === 'dark';
    });

    const handleToggleDarkMode = () => {
        setIsDarkMode((prevState) => !prevState);
    };

    useEffect(() => {
        if (isDarkMode) {
            toggleTheme('dark-mode', 'light-mode');
            localStorage.setItem('theme', JSON.stringify('dark'));
        } else {
            toggleTheme('light-mode', 'dark-mode');
            localStorage.setItem('theme', JSON.stringify('light'));
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider
            value={{
                isDarkMode,
                handleToggleDarkMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
