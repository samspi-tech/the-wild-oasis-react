import Form from '@/ui/Form';
import Input from '@/ui/Input';
import FormRow from '@/ui/FormRow';
import Spinner from '@/ui/Spinner';
import useSettingsQuery from '@/reactQuery/queries/useSettingsQuery';

export default function UpdateSettingsForm() {
    const { isLoading, settings } = useSettingsQuery();

    if (isLoading) return <Spinner />;

    const {
        breakfastPrice,
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
    } = settings!;

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength!}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength!}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={maxGuestsPerBooking!}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice!}
                />
            </FormRow>
        </Form>
    );
}
