import { supabase } from '../supabase';

export type AuthPayload = {
    email: string;
    password: string;
};

export async function login(payload: AuthPayload) {
    const { data, error } = await supabase.auth.signInWithPassword(payload);

    if (error) throw new Error(error.message);

    return data;
}
