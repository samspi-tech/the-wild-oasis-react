import { supabase } from '@/lib/supabase/supabase';
import { type CabinSchema } from '@/zod/cabinSchema';
import { type Tables } from '@/lib/supabase/database.types';
import { uploadCabinImage, getImageFileDetails } from '@/utils/imagesUpload';

export type Cabins = Tables<'cabins'>;

export async function getAllCabins() {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
}

export async function createCabin(payload: CabinSchema) {
    const imageFromString = payload.image as string;

    const imageDetails = getImageFileDetails(payload.image, 'cabin-images');
    const imageFromFile = imageDetails?.imagePath;

    const { id, ...fields } = payload;

    const newCabin = {
        ...fields,
        image: imageFromFile || imageFromString,
    };

    const { data, error } = await supabase
        .from('cabins')
        .insert([newCabin])
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be created');
    }

    if (payload.image instanceof File === false) return data;

    const cabinId = data.id;
    const imageName = imageDetails!.imageName;

    await uploadCabinImage(cabinId, imageName, payload.image);

    return data;
}

export async function updateCabin(payload: CabinSchema, id?: number) {
    const imageFromString = payload.image as string;

    const imageDetails = getImageFileDetails(payload.image, 'cabin-images');
    const imageFromFile = imageDetails?.imagePath;

    const updatedCabin = {
        ...payload,
        image: imageFromFile || imageFromString,
    };

    const { data, error } = await supabase
        .from('cabins')
        .update(updatedCabin)
        .eq('id', id!)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be created');
    }

    if (payload.image instanceof File === false) return data;

    const cabinId = data.id;
    const imageName = imageDetails!.imageName;

    await uploadCabinImage(cabinId, imageName, payload.image);

    return data;
}

export async function deleteCabin(id: number) {
    const { error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }
}
