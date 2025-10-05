import { supabase } from '../supabase';
import { Tables } from '../database.types';

export type Cabins = Tables<'cabins'>;

export async function getAllCabins() {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
}

export async function createCabin(payload: Cabins) {
    const { data, error } = await supabase
        .from('cabins')
        .insert([payload])
        .select();

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be created');
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
