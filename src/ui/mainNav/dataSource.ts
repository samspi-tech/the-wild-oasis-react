import {
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineCog6Tooth,
    HiOutlineHomeModern,
    HiOutlineCalendarDays,
} from 'react-icons/hi2';

export const sidebarNavLinks = [
    {
        id: 'sidenav-link-1',
        to: '/',
        icon: HiOutlineHome,
        name: 'Home',
    },
    {
        id: 'sidenav-link-2',
        to: '/bookings',
        icon: HiOutlineCalendarDays,
        name: 'Bookings',
    },
    {
        id: 'sidenav-link-3',
        to: '/cabins',
        icon: HiOutlineHomeModern,
        name: 'Cabins',
    },
    {
        id: 'sidenav-link-4',
        to: '/users',
        icon: HiOutlineUsers,
        name: 'Users',
    },
    {
        id: 'sidenav-link-5',
        to: '/settings',
        icon: HiOutlineCog6Tooth,
        name: 'Settings',
    },
];
