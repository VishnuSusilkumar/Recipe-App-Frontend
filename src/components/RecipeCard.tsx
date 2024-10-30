import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../axios/axiosInstance";
import { FaBookmark } from "react-icons/fa";

interface RecipeCardProps {
  id: number;
  title: string;
  image: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/${id}`);
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.post("/recipes/save", { recipeId: id });
      console.log("Response", res);

      toast.success("Recipe saved successfully!");
    } catch (error: any) {
      console.error("Failed to save recipe:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="cursor-pointer relative" onClick={handleClick}>
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSave();
        }}
        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md text-gray-800 hover:text-blue-500 transition-colors"
      >
        <FaBookmark size={20} />
      </button>
    </div>
  );
};

export default RecipeCard;
