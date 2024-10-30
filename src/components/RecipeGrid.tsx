import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import Pagination from "@mui/material/Pagination";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface RecipeGridProps {
  recipes: Recipe[];
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes }) => {
  const [page, setPage] = useState(1);
  const recipesPerPage = 8;

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const currentRecipes = recipes.slice(
    (page - 1) * recipesPerPage,
    page * recipesPerPage
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
          />
        ))}
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="standard"
        className="mt-4"
      />
    </div>
  );
};

export default RecipeGrid;
