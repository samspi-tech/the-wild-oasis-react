import { supabase } from '../supabase';

export type LoginPayload = {
    email: string;
    password: string;
};

type SignupPayload = {
    email: string;
    password: string;
    options?: {
        data: {
            avatar: string;
            fullName: string;
        };
    };
};

export async function login(payload: LoginPayload) {
    const { data, error } = await supabase.auth.signInWithPassword(payload);

    if (error) throw new Error(error.message);

    return data;
}

async function getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
}

export async function getCurrentUser() {
    const session = await getSession();
    if (!session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
}

export async function signup(payload: SignupPayload) {
    const { data, error } = await supabase.auth.signUp(payload);

    if (error) throw new Error(error.message);

    return data;
}
