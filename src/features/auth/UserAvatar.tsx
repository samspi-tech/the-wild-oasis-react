import styled from 'styled-components';
import useAuthQuery from '@/reactQuery/queries/useAuthQuery';

const StyledUserAvatar = styled.div`
    gap: 1.2rem;
    display: flex;
    align-items: center;

    font-weight: 500;
    font-size: 1.4rem;
    color: var(--color-grey-600);
`;

const Avatar = styled.img`
    width: 4rem;
    width: 3.6rem;
    display: block;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
    object-position: center;
    outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar() {
    const { user } = useAuthQuery();

    const userName: string = user?.user_metadata.fullName || 'Admin';
    const avatar: string = user?.user_metadata.avatar || 'default-user.jpg';

    return (
        <StyledUserAvatar>
            <Avatar src={avatar} alt={`Avatar of ${userName}`} />
            <span>{userName}</span>
        </StyledUserAvatar>
    );
}
