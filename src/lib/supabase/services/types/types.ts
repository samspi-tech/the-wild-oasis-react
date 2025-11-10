import { type Cabins } from '../cabin.service';
import { type Tables } from '../../database.types';

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

export type GetAllBookingsArgs = {
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

export type Activities = Bookings & {
    guests: {
        fullName: string | null;
        nationality: string | null;
        countryFlag: string | null;
    } | null;
};
