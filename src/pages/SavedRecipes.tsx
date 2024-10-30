import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import SavedRecipeCard from "../components/SavedRecipeCard";
import { toast } from "sonner";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import SearchResults from "../components/SearchResults";
import Loader from "../components/Loader/Loader";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Recipe {
  _id: string;
  title: string;
  image: string;
  ingredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
  }>;
  instructions: Array<{ number: number; instruction: string }>;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
  isVegetarian: boolean;
  isVeryHealthy: boolean;
}

const SavedRecipes: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("all");
  const recipesPerPage = 8;

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axiosInstance.get("/auth/saved-recipes");

        if (response.data.success) {
          setSavedRecipes(response.data.savedRecipes);
        } else {
          toast.error("Failed to fetch saved recipes.");
        }
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
        toast.error("Error fetching saved recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleSearchResults = (results: Recipe[]) => {
    setSearchResults(results);
    setPage(1);
  };

  const handleDelete = (id: string) => {
    setSavedRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe._id !== id)
    );
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const filteredRecipes = savedRecipes.filter((recipe) => {
    if (filter === "veg") return recipe.isVegetarian;
    if (filter === "nonveg") return !recipe.isVegetarian;
    if (filter === "healthy") return recipe.isVeryHealthy;
    return true;
  });

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const currentRecipes = filteredRecipes.slice(
    (page - 1) * recipesPerPage,
    page * recipesPerPage
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (loading) {
    return <Loader />;
  }

  const noResults = filteredRecipes.length === 0;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-16 sm:ml-20 md:ml-24 lg:ml-28">
        <Header onSearch={handleSearchResults} />
        <main className="p-8 bg-[#EDEDED] h-screen">
          {searchResults.length > 0 ? (
            <SearchResults results={searchResults} />
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
                  Saved Recipes
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
                    "No saved recipes found. Try adding some recipes!"
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {currentRecipes.map((recipe) => (
                      <SavedRecipeCard
                        key={recipe._id}
                        id={recipe._id}
                        title={recipe.title}
                        image={recipe.image}
                        onDelete={handleDelete}
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
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SavedRecipes;
