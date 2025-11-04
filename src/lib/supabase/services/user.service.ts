import { supabase } from '../supabase';
import { uploadAvatar } from '@/utils/imagesUpload';

export type UpdatePasswordPayload = {
    password: string;
};

export type UpdateUserPayload = {
    avatar?: File;
    fullName?: string;
};

async function updateUserAvatar(avatar: string) {
    const { data, error } = await supabase.auth.updateUser({
        data: { avatar },
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function updateUser(payload: UpdateUserPayload) {
    const { fullName, avatar } = payload;

    const { data, error } = await supabase.auth.updateUser({
        data: { fullName },
    });

    if (error) throw new Error(error.message);

    if (!avatar) return data;

    const imagePath = await uploadAvatar(avatar);
    await updateUserAvatar(imagePath);

    return data;
}

export async function updatePassword(payload: UpdatePasswordPayload) {
    const { data, error } = await supabase.auth.updateUser(payload);

    if (error) throw new Error(error.message);

    return data;
}
