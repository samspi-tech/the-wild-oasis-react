import * as z from 'zod';
import { FIVE_MEGABYTES_IN_BYTES } from '@/utils/constants';

export const cabinSchema = z
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
