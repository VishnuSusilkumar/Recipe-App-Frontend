import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { AiOutlineWindows } from "react-icons/ai";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (location.pathname === path) {
      navigate(0);
    } else {
      navigate(path);
    }
  };

  return (
    <aside className="fixed top-0 left-0 w-16 sm:w-20 md:w-24 lg:w-28 h-screen bg-white p-6 flex flex-col items-center">
      <button onClick={() => handleNavigation("/")}>
        <img
          src="https://avatars.githubusercontent.com/u/19819005?v=4"
          alt="Logo"
          className="mb-6 w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover"
        />
      </button>
      <ul className="mt-9 space-y-10 md:space-y-12 lg:space-y-14">
        <li>
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center text-lg text-gray-500 hover:text-gray-600"
          >
            <AiOutlineWindows className="text-xl sm:text-2xl md:text-3xl" />
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/profile")}
            className="flex items-center text-lg text-gray-500 hover:text-gray-600"
          >
            <FiUser className="text-xl sm:text-2xl md:text-3xl" />
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/saved-recipes")}
            className="flex items-center text-lg text-gray-500 hover:text-gray-600"
          >
            <MdOutlineSaveAlt className="text-xl sm:text-2xl md:text-3xl" />
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
