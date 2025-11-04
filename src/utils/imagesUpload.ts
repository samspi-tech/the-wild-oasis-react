import { supabase } from '@/lib/supabase/supabase';

export function getImageFileDetails(image?: File | string, path?: string) {
    if (image instanceof File === false) return;

    const imageName = `${Math.random()}-${image?.name}`.replaceAll('/', '');

    const URL = import.meta.env.VITE_SUPABASE_URL;
    const imagePath = `${URL}/storage/v1/object/public/${path}/${imageName}`;

    return { imageName, imagePath };
}

export async function uploadCabinImage(
    cabinId: number,
    imageName: string,
    image: File
) {
    if (!image) return;

    const { error } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, image);

    if (error) {
        await supabase.from('cabins').delete().eq('id', cabinId);

        console.error(error);
        throw new Error('Cabin image could not be uploaded');
    }
}

export async function uploadAvatar(avatar: File) {
    const { imageName, imagePath } = getImageFileDetails(avatar, 'avatars')!;

    const { error } = await supabase.storage
        .from('avatars')
        .upload(imageName, avatar);

    if (error) throw new Error(error.message);

    return imagePath;
}
