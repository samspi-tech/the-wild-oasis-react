import { supabase } from '@/lib/supabase/supabase';
import { type CabinSchema } from '@/zod/cabinSchema';
import { type Tables } from '@/lib/supabase/database.types';
import { uploadImage, getImageFileDetails } from '@/utils/cabinImageUpload';

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
    const image = payload.image as string;

    const imageDetails = getImageFileDetails(payload);

    const { id, ...fields } = payload;

    const newCabin = {
        ...fields,
        image: imageDetails?.imagePath || image,
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
    await uploadImage(cabinId, imageDetails!.imageName, payload);

    return data;
}

export async function updateCabin(payload: CabinSchema, id?: number) {
    const image = payload.image as string;

    const imageDetails = getImageFileDetails(payload);

    const updatedCabin = {
        ...payload,
        image: imageDetails?.imagePath || image,
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
    await uploadImage(cabinId, imageDetails!.imageName, payload);

    return data;
}

export async function deleteCabin(id: number) {
    const { error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }
}
