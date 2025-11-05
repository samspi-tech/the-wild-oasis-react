import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function useDarkMode() {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('ThemeContext was used outside of ThemeProvider');
    }

    return themeContext;
}
