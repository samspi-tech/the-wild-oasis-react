import { supabase } from '../supabase';
import { type Tables } from '../database.types';

type BookingCabin = {
    cabins: {
        name: string | null;
    } | null;
};

type BookingGuest = {
    guests: {
        email: string | null;
        fullName: string | null;
    } | null;
};

export type Bookings = Tables<'bookings'> & BookingCabin & BookingGuest;

export async function getAllBookings() {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, cabins(name), guests(fullName, email)');

    if (error) {
        console.error(error);
        throw new Error('Bookings could not be loaded');
    }

    return data;
}
