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

type FilterAndSort = {
    name: string;
    value: string | null;
};

type GetAllBookingsArgs = {
    filter: FilterAndSort | null;
    sortBy: FilterAndSort | null;
    pages: {
        from: number;
        to: number;
    };
};

export async function getAllBookings({
    pages,
    filter,
    sortBy,
}: GetAllBookingsArgs) {
    let query = supabase
        .from('bookings')
        .select('*, cabins(name), guests(fullName, email)', { count: 'exact' });

    const isAscending = sortBy?.value === 'asc';

    if (pages) query = query.range(pages.from, pages.to);
    if (filter) query = query.eq(filter.name, filter.value!);
    if (sortBy) query = query.order(sortBy.name, { ascending: isAscending });

    const { data, count, error } = await query;

    if (error) {
        console.error(error);
        throw new Error('Bookings could not be loaded');
    }

    return { data, count };
}
