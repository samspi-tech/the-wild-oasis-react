import * as z from 'zod';
import { FIVE_MEGABYTES_IN_BYTES, MIN_PASSWORD_LENGTH } from '@/utils/amounts';

export const updateUserSchema = z.object({
    fullName: z.string().min(1, 'This field cannot be empty').optional(),
    avatar: z
        .file()
        .refine(({ size }) => size < FIVE_MEGABYTES_IN_BYTES, {
            message: 'Image size must be less than 5MB',
        })
        .optional(),
});

export const updatePasswordSchema = z
    .object({
        passwordConfirm: z.string(),
        password: z.string().min(MIN_PASSWORD_LENGTH, 'Password is too short'),
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
    });

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type UpadatePasswordSchema = z.infer<typeof updatePasswordSchema>;
