import { supabase } from '@/lib/supabase/supabase';
import { type CabinSchema } from '@/zod/cabinSchema';

export function getImageFileDetails(payload: CabinSchema) {
    if (payload.image instanceof File === false) return;

    const imageName = `${Math.random()}-${payload.image?.name}`.replaceAll(
        '/',
        ''
    );

    const imagePath = `${
        import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/cabin-images/${imageName}`;

    return { imageName, imagePath };
}

export async function uploadImage(
    cabinId: number,
    imageName: string,
    payload: CabinSchema
) {
    const image = payload.image;

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
