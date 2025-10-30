import Heading from '@/ui/Heading';
import SignupForm from '@/features/auth/SignupForm';

export default function Users() {
    return (
        <>
            <Heading as="h1">Create a new user</Heading>
            <SignupForm />
        </>
    );
}
