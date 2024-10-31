import React from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  onDelete: (id: string) => void; // Keep this for deletion confirmation
}

const SavedRecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/saved-recipes/${id}`);
  };

  return (
    <div
      className="relative bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleClick}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-2">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="absolute top-2 right-2 text-red-600 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  );
};

export default SavedRecipeCard;
