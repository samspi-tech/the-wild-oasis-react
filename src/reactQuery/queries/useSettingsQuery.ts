import { useQuery } from '@tanstack/react-query';
import { getSettings } from '@/lib/supabase/services/settings.service';

export default function useSettingsQuery() {
    const { isLoading, data: settings } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,
    });

    return { isLoading, settings };
}
