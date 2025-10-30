import * as z from 'zod';
import { MIN_PASSWORD_LENGTH } from '@/utils/amounts';

export const signupSchema = z
    .object({
        email: z.email(),
        passwordConfirm: z.string(),
        fullName: z.string().min(1, 'This field is required'),
        password: z.string().min(MIN_PASSWORD_LENGTH, 'Password is too short'),
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
    });

export type SignupSchema = z.infer<typeof signupSchema>;
