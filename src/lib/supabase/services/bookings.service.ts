import { supabase } from '../supabase';
import { PAGE_SIZE } from '@/utils/amounts';
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

type GetAllBookingsArgs = {
    currentPage: number;
    filter: {
        name: string;
        value: string | null;
    } | null;
    sortBy: {
        field: string;
        direction: string;
    };
};

export async function getAllBookings({
    filter,
    sortBy,
    currentPage,
}: GetAllBookingsArgs) {
    let query = supabase
        .from('bookings')
        .select('*, cabins(name), guests(fullName, email)', { count: 'exact' });

    const isAscending = sortBy?.direction === 'asc';

    const startingIndex = (currentPage - 1) * PAGE_SIZE;
    const lastIndex = startingIndex + PAGE_SIZE - 1;

    if (filter) query = query.eq(filter.name, filter.value!);
    if (currentPage) query = query.range(startingIndex, lastIndex);
    if (sortBy) query = query.order(sortBy.field, { ascending: isAscending });

    const { data, count, error } = await query;

    if (error) {
        console.error(error);
        throw new Error('Bookings could not be loaded');
    }

    return { data, count };
}
