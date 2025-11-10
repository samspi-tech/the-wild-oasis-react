import { supabase } from '../supabase';
import { getToday } from '@/utils/helpers';
import { PAGE_SIZE } from '@/utils/amounts';
import { type UpdateBookingArgs, type GetAllBookingsArgs } from './types/types';

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

export async function getStaysTodayActivity() {
    const startDate = getToday();
    const endDate = getToday({ end: true });

    const { data, error } = await supabase
        .from('bookings')
        .select('*, guests(fullName, nationality, countryFlag)')
        .or(
            `and(status.eq.unconfirmed,startDate.eq.${startDate}),and(status.eq.checked-in,endDate.eq.${endDate})`
        )
        .order('created_at');

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    return data;
}
