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
    const { data, error } = await supabase
        .from('cabins')
        .insert([payload])
        .select();

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be created');
    }

    return data;
}

export async function deleteCabin(id: number) {
    const { error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }
}
