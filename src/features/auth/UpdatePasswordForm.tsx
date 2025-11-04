import {
    updatePasswordSchema,
    type UpadatePasswordSchema,
} from '@/zod/accountSchema';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAccountMutation from '@/reactQuery/mutations/useAccountMutation';

import Form from '@/ui/Form';
import Button from '@/ui/Button';
import FormRow from '@/ui/FormRow';
import InputPassword from '@/ui/InputPassword';

export default function UpdatePasswordForm() {
    const { handleUpdatePassword, isUpdatingPassword, isUpdatingUser } =
        useAccountMutation();

    const { register, handleSubmit, formState, reset } =
        useForm<UpadatePasswordSchema>({
            resolver: zodResolver(updatePasswordSchema),
        });
    const { errors } = formState;

    const onSubmit = (data: UpadatePasswordSchema) => {
        const { password } = data;
        handleUpdatePassword({ password }, { onSettled: () => reset() });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                error={errors?.password?.message}
                label="Password (min 8 characters)"
            >
                <InputPassword
                    id="password"
                    register={register}
                    isDisabled={isUpdatingPassword || isUpdatingUser}
                />
            </FormRow>
            <FormRow
                label="Confirm password"
                error={errors?.passwordConfirm?.message}
            >
                <InputPassword
                    id="passwordConfirm"
                    register={register}
                    isDisabled={isUpdatingPassword || isUpdatingUser}
                />
            </FormRow>
            <FormRow>
                <>
                    <Button
                        type="reset"
                        variation="secondary"
                        disabled={isUpdatingPassword || isUpdatingUser}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isUpdatingPassword || isUpdatingUser}
                    >
                        Update password
                    </Button>
                </>
            </FormRow>
        </Form>
    );
}
