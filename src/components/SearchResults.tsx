import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Recipe {
  id: number;
  title: string;
  image: string;
  vegetarian: boolean;
  veryHealthy: boolean;
}

interface SearchResultsProps {
  results: Recipe[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string>("all");
  const recipesPerPage = 8;

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const filteredResults = results.filter((recipe) => {
    if (filter === "veg") return recipe.vegetarian;
    if (filter === "nonveg") return !recipe.vegetarian;
    if (filter === "healthy") return recipe.veryHealthy;
    return true;
  });

  const totalPages = Math.ceil(filteredResults.length / recipesPerPage);
  const currentResults = filteredResults.slice(
    (page - 1) * recipesPerPage,
    page * recipesPerPage
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const noResults = results.length === 0 || filteredResults.length === 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
          Search Results
        </h1>
        <Select
          value={filter}
          onChange={handleFilterChange}
          className="bg-white border border-gray-300"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="veg">Vegetarian</MenuItem>
          <MenuItem value="nonveg">Non-Vegetarian</MenuItem>
          <MenuItem value="healthy">Healthy</MenuItem>
        </Select>
      </div>

      {noResults ? (
        <div className="p-8 text-center text-gray-700">
          <p className="text-lg italic">
            "No recipes found. Try a different search or filter."
          </p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SearchResults;
