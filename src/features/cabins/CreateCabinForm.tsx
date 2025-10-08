import * as z from 'zod';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import toast from 'react-hot-toast';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import FileInput from '../../ui/FileInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { FIVE_MEGABYTES_IN_BYTES } from '../../utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../lib/supabase/services/cabin.service';

const cabinSchema = z
    .object({
        discount: z.number('This field is required'),
        maxCapacity: z.number('This field is required'),
        regularPrice: z.number('This field is required'),
        name: z.string().min(1, 'This field is required'),
        description: z.string().min(1, 'This field is required'),
        image: z.file('Image is required').max(FIVE_MEGABYTES_IN_BYTES, {
            message: 'Image must be less than 5MB',
        }),
    })
    .refine(({ discount, regularPrice }) => discount <= regularPrice, {
        message: 'Discount should be less or equal than regular price',
        path: ['discount'],

        when(payload) {
            return cabinSchema
                .pick({ discount: true, regularPrice: true })
                .safeParse(payload.value).success;
        },
    });

export type CabinSchema = z.infer<typeof cabinSchema>;

type CreateCabinFormProps = {
    onHide: () => void;
};

export default function CreateCabinForm({ onHide }: CreateCabinFormProps) {
    const { register, handleSubmit, reset, formState, setValue } =
        useForm<CabinSchema>({
            resolver: zodResolver(cabinSchema),
        });
    const { errors } = formState;

    const queryClient = useQueryClient();

    const { mutate: handleCreateCabin, isPending } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success('New cabin successfully created');

            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });

            reset();
            onHide();
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    const onSubmit = (data: CabinSchema) => handleCreateCabin(data);

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
                error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isPending}
                    {...register('maxCapacity', { valueAsNumber: true })}
                />
            </FormRow>
            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}>
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
                error={errors?.description?.message}>
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
                    <Button
                        type="reset"
                        disabled={isPending}
                        variation="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Creating...' : 'Add cabin'}
                    </Button>
                </>
            </FormRow>
        </Form>
    );
}
