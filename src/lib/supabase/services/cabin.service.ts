import { Tables } from '../database.types';
import { supabase } from '../supabase';

export type Cabins = Tables<'cabins'>;

export async function getAllCabins() {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
}
