import { supabase } from '../supabase';
import { getToday } from '@/utils/helpers';
import { PAGE_SIZE } from '@/utils/amounts';
import { type Cabins } from './cabin.service';
import { type Tables } from '../database.types';

type Guests = Tables<'guests'>;
type Bookings = Tables<'bookings'>;

export type StaysAfterDate = Bookings & {
    guests: {
        fullName: string | null;
    } | null;
};

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

export type AllBookings = Bookings & BookingCabin & BookingGuest;

export type SingleBooking = Bookings & {
    cabins: Cabins | null;
} & {
    guests: Guests | null;
};

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

export type UpdateBookingArgs = {
    id: number;
    payload: {
        status: string;
        isPaid?: boolean;
        totalPrice?: number;
        extrasPrice?: number;
        hasBreakfast?: boolean;
    };
};

export type BookingsAfterDate = {
    created_at: string;
    totalPrice: number | null;
    extrasPrice: number | null;
}[];

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

export async function getSingleBooking(id: number) {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, cabins(*), guests(*)')
        .eq('id', id)
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking not found');
    }

    return data;
}

export async function updateBooking({ id, payload }: UpdateBookingArgs) {
    const { data, error } = await supabase
        .from('bookings')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }
    return data;
}

export async function deleteBooking(id: number) {
    const { data, error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }
    return data;
}

export async function getBookingsAfterDate(date: string) {
    const { data, error } = await supabase
        .from('bookings')
        .select('created_at, totalPrice, extrasPrice')
        .gte('created_at', date)
        .lte('created_at', getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    return data;
}

export async function getStaysAfterDate(date: string) {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, guests(fullName)')
        .gte('startDate', date)
        .lte('startDate', getToday());

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    return data;
}
