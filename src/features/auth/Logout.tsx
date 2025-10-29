import ButtonIcon from '@/ui/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import useAuthMutation from '@/reactQuery/mutations/useAuthMutation';
import SpinnerMini from '@/ui/SpinnerMini';

export default function Logout() {
    const { isLogingOut, handleLogout } = useAuthMutation();

    return (
        <ButtonIcon
            aria-label="logout"
            disabled={isLogingOut}
            onClick={() => handleLogout()}
        >
            {isLogingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    );
}
