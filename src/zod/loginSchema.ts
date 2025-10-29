import * as z from 'zod';
import { MIN_PASSWORD_LENGTH } from '@/utils/amounts';

export const loginSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .refine((password) => password.length > MIN_PASSWORD_LENGTH, {
            message: 'Password must be at least 6 chars long.',
        }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
