import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupSchema } from '@/zod/signupSchema';

import Form from '@/ui/Form';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import FormRow from '@/ui/FormRow';
import InputPassword from '@/ui/InputPassword';

export default function SignupForm() {
    const { register, formState, handleSubmit } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
    });
    const { errors } = formState;

    const onSubmit = (data: SignupSchema) => console.log(data);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input type="text" id="fullName" {...register('fullName')} />
            </FormRow>
            <FormRow label="Email address" error={errors?.email?.message}>
                <Input type="email" id="email" {...register('email')} />
            </FormRow>
            <FormRow
                error={errors?.password?.message}
                label="Password (min 8 characters)"
            >
                <InputPassword id="password" register={register} />
            </FormRow>
            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <InputPassword id="passwordConfirm" register={register} />
            </FormRow>
            <FormRow>
                <>
                    <Button type="reset" variation="secondary">
                        Cancel
                    </Button>
                    <Button type="submit">Create new user</Button>
                </>
            </FormRow>
        </Form>
    );
}
