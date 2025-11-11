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
        const isBrowserThemeDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        const browserTheme = isBrowserThemeDark ? 'dark' : 'light';
        const localStorageTheme = localStorage.getItem('localStorageTheme');

        const currTheme: string = !localStorageTheme
            ? browserTheme
            : JSON.parse(localStorageTheme);

        return currTheme === 'dark';
    });

    const handleToggleDarkMode = () => {
        setIsDarkMode((prevState) => !prevState);
    };

    useEffect(() => {
        if (isDarkMode) {
            toggleTheme('dark-mode', 'light-mode');
            localStorage.setItem('localStorageTheme', JSON.stringify('dark'));
        } else {
            toggleTheme('light-mode', 'dark-mode');
            localStorage.setItem('localStorageTheme', JSON.stringify('light'));
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
