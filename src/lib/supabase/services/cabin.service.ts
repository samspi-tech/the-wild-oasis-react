import {
    uploadImage,
    getImageFileDetails,
} from '../../../utils/cabinImageUpload';
import { supabase } from '../supabase';
import { Tables } from '../database.types';
import { type CabinSchema } from '../../../features/cabins/CreateCabinForm';

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
    const { imageName, imagePath } = getImageFileDetails(payload);

    const newCabin = {
        ...payload,
        image: imagePath,
    };

    const { data, error } = await supabase
        .from('cabins')
        .insert([newCabin])
        .select();

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be created');
    }

    const cabinId = data[0].id;
    await uploadImage(cabinId, imageName, payload);

    return data;
}

export async function deleteCabin(id: number) {
    const { error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }
}
