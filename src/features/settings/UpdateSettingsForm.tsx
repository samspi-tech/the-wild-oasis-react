import { type ChangeEvent } from 'react';

import Form from '@/ui/Form';
import Input from '@/ui/Input';
import FormRow from '@/ui/FormRow';
import Spinner from '@/ui/Spinner';

import useSettingsQuery from '@/reactQuery/queries/useSettingsQuery';
import { type Settings } from '@/lib/supabase/services/settings.service';
import { useSettingsMutation } from '@/reactQuery/mutations/useSettingsMutation';

export default function UpdateSettingsForm() {
    const { isLoading, settings } = useSettingsQuery();
    const { isPending, handleUpdateSetting } = useSettingsMutation();

    if (isLoading) return <Spinner />;

    const {
        breakfastPrice,
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
    } = settings!;

    const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, valueAsNumber: value } = e.target;
        if (!value) return;

        const payload = { [name]: value };

        const isValueNotUpdated =
            settings![name as keyof Settings] === payload[name];

        if (isValueNotUpdated) return;

        handleUpdateSetting(payload);
    };

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    disabled={isPending}
                    onBlur={handleUpdate}
                    name="minBookingLength"
                    defaultValue={minBookingLength!}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    disabled={isPending}
                    onBlur={handleUpdate}
                    name="maxBookingLength"
                    defaultValue={maxBookingLength!}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    disabled={isPending}
                    onBlur={handleUpdate}
                    name="maxGuestsPerBooking"
                    defaultValue={maxGuestsPerBooking!}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    disabled={isPending}
                    onBlur={handleUpdate}
                    name="breakfastPrice"
                    defaultValue={breakfastPrice!}
                />
            </FormRow>
        </Form>
    );
}
