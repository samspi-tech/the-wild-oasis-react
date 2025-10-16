import Form from '@/ui/Form';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import FormRow from '@/ui/FormRow';
import Textarea from '@/ui/Textarea';
import FileInput from '@/ui/FileInput';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cabinSchema, type CabinSchema } from '@/zod/cabinSchema';
import { type Cabins } from '@/lib/supabase/services/cabin.service';
import { useCabinMutation } from '@/reactQuery/mutations/useCabinMutation';

type CreateCabinFormProps = {
    cabin?: Cabins;
    onHide: () => void;
};

export default function CreateCabinForm({
    cabin,
    onHide,
}: CreateCabinFormProps) {
    const isUpdateCabin = !!cabin?.id;
    const submitButtonName = isUpdateCabin ? 'Update cabin' : 'Add cabin';
    const pendingStatus = isUpdateCabin ? 'Updating...' : 'Creating...';

    const { register, handleSubmit, reset, formState, setValue } =
        useForm<CabinSchema>({
            defaultValues: {
                id: cabin?.id ?? undefined,
                name: cabin?.name ?? undefined,
                image: cabin?.image ?? undefined,
                discount: cabin?.discount ?? undefined,
                maxCapacity: cabin?.maxCapacity ?? undefined,
                description: cabin?.description ?? undefined,
                regularPrice: cabin?.regularPrice ?? undefined,
            },
            resolver: zodResolver(cabinSchema),
        });
    const { errors } = formState;

    const cabinId = cabin?.id;

    const { isPending, onSubmit } = useCabinMutation({
        reset,
        onHide,
        cabinId,
        isUpdateCabin,
    });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    id="name"
                    type="text"
                    autoComplete="on"
                    disabled={isPending}
                    {...register('name')}
                />
            </FormRow>
            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isPending}
                    {...register('maxCapacity', { valueAsNumber: true })}
                />
            </FormRow>
            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isPending}
                    {...register('regularPrice', { valueAsNumber: true })}
                />
            </FormRow>
            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isPending}
                    {...register('discount', { valueAsNumber: true })}
                />
            </FormRow>
            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    id="description"
                    disabled={isPending}
                    {...register('description')}
                />
            </FormRow>
            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isPending}
                    onChange={(e) => setValue('image', e.target.files![0])}
                />
            </FormRow>
            <FormRow>
                <>
                    {!isUpdateCabin && (
                        <Button
                            type="reset"
                            disabled={isPending}
                            variation="secondary"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isPending}>
                        {isPending ? pendingStatus : submitButtonName}
                    </Button>
                </>
            </FormRow>
        </Form>
    );
}
