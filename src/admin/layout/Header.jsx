// FILE: src/components/Header.jsx

import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ChevronDownIcon
} from "@heroicons/react/24/solid";

// Aapke project structure ke anusaar import path
import { selectLogin, logoutAsync } from '../../features/adminSlice/auth/loginSlice'; 

// Server ka URL yahan define kiya gaya hai
const SERVER_URL = 'http://localhost:3000';

const Header = ({ setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useSelector(selectLogin);

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate('/admin-login');
  };

  // --- UPDATE: Purana simple function, bas server URL add kiya gaya hai ---
  const getAvatarUrl = () => {
    // Agar user ka avatar hai, to uske aage server URL jod do
    if (user?.avatar) {
      return `${SERVER_URL}${user.avatar}`;
    }
    // Agar avatar nahi hai, to naam se image banao (original logic)
    if (user?.name) {
      const formattedName = user.name.replace(/\s+/g, '+');
      return `https://ui-avatars.com/api/?name=${formattedName}&background=0D8ABC&color=fff&font-size=0.5`;
    }
    // Default fallback
    return "https://ui-avatars.com/api/?name=?&background=random&color=fff";
  };

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Hamburger Menu for mobile */}
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Right side of header */}
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            
            <div className="hidden sm:block h-6 w-px bg-gray-200" aria-hidden="true" />

            {/* Profile dropdown */}
            {isAuthenticated && user ? (
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="flex items-center gap-x-2 rounded-full p-1.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-9 w-9 rounded-full object-cover"
                      src={getAvatarUrl()}
                      alt={`${user.name}'s avatar`}
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="font-semibold text-gray-800" aria-hidden="true">
                        {user.name}
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="truncate text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/admin/profile"
                          className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link to="/admin-login" className="text-sm font-semibold text-gray-700 hover:text-red-600">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;