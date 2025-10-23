import Menus from '@/ui/Menus';
import Table from '@/ui/Table';
import Spinner from '@/ui/Spinner';
import BookingRow from './BookingRow';

import Empty from '@/ui/Empty';
import useBookingQuery from '@/reactQuery/queries/useBookingQuery';
import { type Bookings } from '@/lib/supabase/services/bookings.service';

export default function BookingTable() {
    const { isLoading, bookings } = useBookingQuery();

    if (isLoading) return <Spinner />;
    if (!bookings?.length) return <Empty resourceName="booking" />;

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>
                <Table.Body<Bookings>
                    data={bookings}
                    render={(booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    )}
                />
            </Table>
        </Menus>
    );
}
