import ButtonIcon from './ButtonIcon';
import useDarkMode from '@/hooks/useDarkMode';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

export default function ThemeToggle() {
    const { isDarkMode, handleToggleDarkMode } = useDarkMode();

    return (
        <ButtonIcon onClick={handleToggleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    );
}
