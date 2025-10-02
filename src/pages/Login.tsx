import styled from 'styled-components';

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
    return <LoginLayout>Login</LoginLayout>;
}
