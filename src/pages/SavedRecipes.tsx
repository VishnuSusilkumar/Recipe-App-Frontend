import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import SavedRecipeCard from "../components/SavedRecipeCard";
import { toast } from "sonner";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import SearchResults from "../components/SearchResults";
import Loader from "../components/Loader/Loader";
import Pagination from "@mui/material/Pagination";

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
}

const SavedRecipes: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [page, setPage] = useState<number>(1);
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

  const totalPages = Math.ceil(savedRecipes.length / recipesPerPage);

  const currentRecipes = savedRecipes.slice(
    (page - 1) * recipesPerPage,
    page * recipesPerPage
  );
  
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-16 sm:ml-20 md:ml-24 lg:ml-28">
        <Header onSearch={handleSearchResults} />
        <main className="p-8 bg-[#EDEDED] h-screen">
          <h1 className="text-2xl font-bold mb-4">Saved Recipes</h1>
          {searchResults.length > 0 ? (
            <SearchResults results={searchResults} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
        </main>
      </div>
    </div>
  );
};

export default SavedRecipes;
