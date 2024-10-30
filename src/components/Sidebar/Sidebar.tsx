import React from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { AiOutlineWindows } from "react-icons/ai";

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed top-0 left-0 w-16 sm:w-20 md:w-24 lg:w-28 h-screen bg-white p-6 flex flex-col items-center">
      <img src="./logo.png" alt="Logo" className="mb-6 w-8 h-8 sm:w-10 sm:h-10" />
      <ul className="mt-9 space-y-10 md:space-y-12 lg:space-y-14">
        <li>
          <Link
            to="/home"
            className="flex items-center text-lg text-gray-500 hover:text-gray-600"
          >
            <AiOutlineWindows className="text-xl sm:text-2xl md:text-3xl" />
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="flex items-center text-lg text-gray-500 hover:text-gray-600"
          >
            <FiUser className="text-xl sm:text-2xl md:text-3xl" />
          </Link>
        </li>
        <li>
          <Link
            to="/saved-recipes"
            className="flex items-center text-lg text-gray-500 hover:text-gray-600"
          >
            <MdOutlineSaveAlt className="text-xl sm:text-2xl md:text-3xl" />
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
