import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '@/zod/loginSchema';
import useAuthMutation from '@/reactQuery/mutations/useAuthMutation';

import Form from '@/ui/Form';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import FormRow from '@/ui/FormRow';
import SpinnerMini from '@/ui/SpinnerMini';
import InputPassword from '@/ui/InputPassword';

export default function LoginForm() {
    const { isLogingIn, handleLogin } = useAuthMutation();

    const { register, formState, handleSubmit, reset } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });
    const { errors } = formState;

    const onSubmit = (data: LoginSchema) => {
        handleLogin(data, { onSettled: () => reset() });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                type="vertical"
                label="Email address"
                error={errors?.email?.message}
            >
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    disabled={isLogingIn}
                    {...register('email')}
                />
            </FormRow>
            <FormRow
                type="vertical"
                label="Password"
                error={errors?.password?.message}
            >
                <InputPassword
                    id="password"
                    register={register}
                    isDisabled={isLogingIn}
                    autoComplete="current-password"
                />
            </FormRow>
            <FormRow type="vertical">
                <Button type="submit" size="large" disabled={isLogingIn}>
                    {isLogingIn ? <SpinnerMini /> : 'Login'}
                </Button>
            </FormRow>
        </Form>
    );
}
