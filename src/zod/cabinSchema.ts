import * as z from 'zod';

import {
    MIN_NAME_LENGTH,
    MIN_DESCRIPTION_LENGTH,
    FIVE_MEGABYTES_IN_BYTES,
} from '@/utils/amounts';

const imageSchema = z.union([
    z
        .instanceof(File)
        .refine(({ size }) => size < FIVE_MEGABYTES_IN_BYTES, {
            message: 'Image size must be less than 5MB',
        })
        .optional(),
    z.string().optional(),
]);

export const cabinSchema = z
    .object({
        id: z.number().optional(),
        discount: z.number('This field is required'),
        maxCapacity: z.number('This field is required'),
        regularPrice: z.number('This field is required'),
        name: z.string().min(MIN_NAME_LENGTH, 'Name must be at least 3 chars'),
        description: z
            .string()
            .min(
                MIN_DESCRIPTION_LENGTH,
                'Description must be at least 5 chars'
            ),
        image: imageSchema,
    })
    .superRefine(({ discount, regularPrice, image, id }, ctx) => {
        const isAddNewCabin = id === undefined && image === undefined;

        if (discount > regularPrice) {
            ctx.addIssue({
                code: 'custom',
                message: 'Discount should be less or equal than regular price',
                path: ['discount'],
            });
        } else if (isAddNewCabin) {
            ctx.addIssue({
                code: 'custom',
                message: 'Image is required',
                path: ['image'],
            });
        }
    });

export type CabinSchema = z.infer<typeof cabinSchema>;
