import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../axios/axiosInstance";
import { useSelector } from "react-redux";

interface HeaderProps {
  onSearch: (results: any[]) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { name } = useSelector((state: any) => state.user);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/recipes/search`, {
        params: { query: searchQuery },
      });
      console.log("Search results:", response.data.recipes);
      onSearch(response.data.recipes);
    } catch (error: any) {
      console.error("Error searching recipes:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white">
      <div className="flex flex-col mb-2 md:mb-0 text-left">
        <h2
          className="text-lg md:text-2xl text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Welcome, <span className="font-normal">{name}</span>
        </h2>
        <p className="text-gray-600 italic text-sm md:text-base">
          Explore, create, and savor every recipe.
        </p>
      </div>

      <div className="flex items-center space-x-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Discover new recipes..."
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-800 transition"
        >
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
