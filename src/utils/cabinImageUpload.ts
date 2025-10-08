import { supabase } from '../lib/supabase/supabase';
import { type CabinSchema } from '../features/cabins/CreateCabinForm';

export function getImageFileDetails(payload: CabinSchema) {
    const imageName = `${Math.random()}-${payload.image.name}`.replaceAll(
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
    const imageFile = payload.image;

    const { error } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, imageFile);

    if (error) {
        await supabase.from('cabins').delete().eq('id', cabinId);

        console.error(error);
        throw new Error('Cabin image could not be uploaded');
    }
}
