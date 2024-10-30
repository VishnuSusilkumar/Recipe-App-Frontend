import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FiTrash2 } from "react-icons/fi";
import axiosInstance from "../axios/axiosInstance";
import ConfirmationModal from "./ConfirmModel/ConfirmationModal";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  onDelete: (id: string) => void;
}

const SavedRecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/recipes/delete/${id}`);
      toast.success("Recipe removed successfully!");
      onDelete(id);
      setShowModal(false);
    } catch (error: any) {
      console.error("Failed to delete recipe:", error);
      toast.error("Failed to delete recipe. Please try again.");
    }
  };

  const handleClick = () => {
    if (!showModal) {
      navigate(`/recipes/saved-recipes/${id}`);
    }
  };

  return (
    <div
      className="relative bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        className="absolute top-2 right-2 text-red-600 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none"
      >
        <FiTrash2 size={20} />
      </button>

      {/* Confirmation modal */}
      {showModal && (
        <ConfirmationModal
          title="Delete Recipe"
          message="Are you sure you want to delete this recipe?"
          onConfirm={handleDelete}
          onCancel={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default SavedRecipeCard;
