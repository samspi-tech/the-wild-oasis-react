import Spinner from './Spinner';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
import useAuthQuery from '@/reactQuery/queries/useAuthQuery';

type ProtectedRoutesProps = {
    children: ReactNode;
};

const FullPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
    background-color: var(--color-grey-50);
`;

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useAuthQuery();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/login', { replace: true });
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    if (isAuthenticated) return children;
}
