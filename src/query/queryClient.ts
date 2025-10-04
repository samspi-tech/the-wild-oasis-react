import { QueryClient } from '@tanstack/react-query';
import { ONE_MINUTE_IN_MILLISECONDS } from '../constants';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: ONE_MINUTE_IN_MILLISECONDS,
        },
    },
});
