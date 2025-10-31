import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupSchema } from '@/zod/signupSchema';

import Form from '@/ui/Form';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import FormRow from '@/ui/FormRow';
import InputPassword from '@/ui/InputPassword';
import useAuthMutation from '@/reactQuery/mutations/useAuthMutation';

export default function SignupForm() {
    const { register, formState, handleSubmit, reset } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
    });
    const { errors } = formState;

    const { isSigningUp, handleSignup } = useAuthMutation();

    const onSubmit = (data: SignupSchema) => {
        const { fullName, email, password } = data;

        const options = {
            data: {
                fullName,
                avatar: '',
            },
        };

        const payload = {
            email,
            options,
            password,
        };

        handleSignup(payload, { onSettled: () => reset() });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isSigningUp}
                    {...register('fullName')}
                />
            </FormRow>
            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    disabled={isSigningUp}
                    {...register('email')}
                />
            </FormRow>
            <FormRow
                error={errors?.password?.message}
                label="Password (min 8 characters)"
            >
                <InputPassword
                    id="password"
                    register={register}
                    isDisabled={isSigningUp}
                />
            </FormRow>
            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <InputPassword
                    register={register}
                    id="passwordConfirm"
                    isDisabled={isSigningUp}
                />
            </FormRow>
            <FormRow>
                <>
                    <Button
                        type="reset"
                        variation="secondary"
                        disabled={isSigningUp}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSigningUp}>
                        Create new user
                    </Button>
                </>
            </FormRow>
        </Form>
    );
}
