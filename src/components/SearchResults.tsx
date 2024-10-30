import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import Pagination from "@mui/material/Pagination";

interface SearchResultsProps {
  results: any[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const [page, setPage] = useState(1);
  const recipesPerPage = 8;

  const totalPages = Math.ceil(results.length / recipesPerPage);

  const currentResults = results.slice(
    (page - 1) * recipesPerPage,
    page * recipesPerPage
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (results.length === 0) {
    return (
      <div className="p-8 text-center text-gray-700">
        No recipes found. Try a different search.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentResults.map((recipe) => (
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

export default SearchResults;
