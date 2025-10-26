import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toast from './ui/Toast';
import Login from './pages/Login';
import Users from './pages/Users';
import Cabins from './pages/Cabins';
import Booking from './pages/Booking';
import Account from './pages/Account';
import AppLayout from './ui/AppLayout';
import Settings from './pages/Settings';
import Bookings from './pages/Bookings';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';
import { queryClient } from './reactQuery/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />

            <Toast />
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
                        <Route
                            path="/bookings/:bookingId"
                            element={<Booking />}
                        />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}
