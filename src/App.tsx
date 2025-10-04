import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import Login from './pages/Login';
import Cabins from './pages/Cabins';
import Account from './pages/Account';
import AppLayout from './ui/AppLayout';
import Bookings from './pages/Bookings';
import Settings from './pages/Settings';
import { ONE_MINUTE } from './constants';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: ONE_MINUTE,
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />

            <GlobalStyles />
            <Router>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index path="/" element={<Dashboard />} />

                        <Route path="/users" element={<Users />} />
                        <Route path="/cabins" element={<Cabins />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/bookings" element={<Bookings />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}
