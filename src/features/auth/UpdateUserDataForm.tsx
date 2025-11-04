import { type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthQuery from '@/reactQuery/queries/useAuthQuery';
import useAccountMutation from '@/reactQuery/mutations/useAccountMutation';
import { updateUserSchema, type UpdateUserSchema } from '@/zod/accountSchema';

import Form from '@/ui/Form';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import FormRow from '@/ui/FormRow';
import FileInput from '@/ui/FileInput';

export default function UpdateUserDataForm() {
    const { user } = useAuthQuery();
    const { handleUpdateUser, isUpdatingUser, isUpdatingPassword } =
        useAccountMutation();

    const email = user?.email;
    const currentFullName: string = user?.user_metadata.fullName ?? 'Admin';

    const { register, formState, handleSubmit, setValue, getValues, reset } =
        useForm<UpdateUserSchema>({
            resolver: zodResolver(updateUserSchema),
        });
    const { errors } = formState;

    const handleAvatarFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setValue('avatar', e.target.files[0]);
    };

    const onSubmit = (data: UpdateUserSchema) => {
        const inputAvatar = getValues('avatar');

        const inputFullName = getValues('fullName');
        const isEditFullName = inputFullName !== currentFullName;

        if (isEditFullName || inputAvatar) {
            handleUpdateUser(data, { onSettled: () => reset() });
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    {...register('fullName')}
                    defaultValue={currentFullName}
                    disabled={isUpdatingUser || isUpdatingPassword}
                />
            </FormRow>
            <FormRow label="Avatar image" error={errors?.avatar?.message}>
                <FileInput
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarFile}
                    disabled={isUpdatingUser || isUpdatingPassword}
                />
            </FormRow>
            <FormRow>
                <>
                    <Button
                        type="reset"
                        variation="secondary"
                        disabled={isUpdatingUser || isUpdatingPassword}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isUpdatingUser || isUpdatingPassword}
                    >
                        Update account
                    </Button>
                </>
            </FormRow>
        </Form>
    );
}
