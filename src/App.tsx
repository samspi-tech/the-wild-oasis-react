import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import Login from './pages/Login';
import Cabins from './pages/Cabins';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';

export default function App() {
    return (
        <>
            <GlobalStyles />
            <Router>
                <Routes>
                    <Route index path="/" element={<Dashboard />} />

                    <Route path="/users" element={<Users />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cabins" element={<Cabins />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/bookings" element={<Bookings />} />

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </>
    );
}
