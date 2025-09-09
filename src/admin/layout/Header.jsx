// ✅ FILE: Header.jsx (UPDATED)

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

// Auth slice se sirf logout action import karein
import { logoutAsync } from '../../features/adminSlice/auth/loginSlice';
// Profile slice se user data lene ke liye selector import karein
import { selectUserProfile, clearProfile } from '../../features/adminSlice/profile/profileSlice';

const SERVER_URL = import.meta.env.VITE_BASE_URL; // Isko environment variable mein daalna behtar hai

const Header = ({ setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // ✅ CORRECT: User data ab `profile` slice se aa raha hai
  const user = useSelector(selectUserProfile);
  
  // ✅ CORRECT: Authentication status `auth` slice se aa raha hai
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAsync())
      .unwrap()
      .then(() => {
        // Auth slice logout ke baad, profile slice ka data bhi manually clear karein
        // (Iska behtar tareeka Kadam 2 mein bataya gaya hai)
        dispatch(clearProfile());
        navigate('/admin-login');
      })
      .catch(() => {
        // Agar API fail bhi ho jaye, client-side logout to ho hi jayega
        dispatch(clearProfile());
        navigate('/admin-login');
      });
  };

  const getAvatarUrl = () => {
    if (user?.avatar) {
      // Ensure the path is correct if the server provides a full URL or just a path
      return user.avatar.startsWith('http') ? user.avatar : `${SERVER_URL}${user.avatar}`;
    }
    if (user?.name) {
      const formattedName = user.name.replace(/\s+/g, '+');
      return `https://ui-avatars.com/api/?name=${formattedName}&background=0D8ABC&color=fff&font-size=0.5`;
    }
    return "https://ui-avatars.com/api/?name=?&background=random&color=fff";
  };

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="hidden sm:block h-6 w-px bg-gray-200" aria-hidden="true" />
            
            {/* Ab ye check karega ki user authenticated hai AUR user ka data load ho chuka hai */}
            {isAuthenticated && user ? (
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="flex items-center gap-x-2 rounded-full p-1.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <img className="h-9 w-9 rounded-full object-cover" src={getAvatarUrl()} alt={`${user.name}'s avatar`} />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="font-semibold text-gray-800">{user.name}</span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
                    </span>
                  </Menu.Button>
                </div>
                <Transition /* ... (No changes here) */ >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="truncate text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/admin/profile" className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
                          <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={handleLogout} className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
                          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link to="/admin-login" className="text-sm font-semibold text-gray-700 hover:text-red-600">Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;