import { supabase } from '../supabase';
import { type Tables } from '../database.types';

type Setting = { [name: string]: number };

export type Settings = Tables<'settings'>;

export async function getSettings() {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

    if (error) {
        console.error(error);
        throw new Error('Settings could not be loaded');
    }

    return data;
}

export async function updateSetting(newSetting: Setting) {
    const { data, error } = await supabase
        .from('settings')
        .update(newSetting)
        .eq('id', 1)
        .single();

    if (error) {
        console.error(error);
        throw new Error('Settings could not be updated');
    }

    return data;
}
