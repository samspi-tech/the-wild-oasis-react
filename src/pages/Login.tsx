import Logo from '@/ui/Logo';
import Heading from '@/ui/Heading';
import styled from 'styled-components';
import LoginForm from '@/features/auth/LoginForm';

const LoginLayout = styled.main`
    gap: 3.2rem;
    display: grid;
    min-height: 100vh;
    align-content: center;
    justify-content: center;
    grid-template-columns: 48rem;
    background-color: var(--color-grey-50);
`;

export default function Login() {
    return (
        <LoginLayout>
            <Logo />
            <Heading center={true} as="h2">
                Log in to your account
            </Heading>
            <LoginForm />
        </LoginLayout>
    );
}
