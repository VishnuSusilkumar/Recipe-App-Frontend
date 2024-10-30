import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "sonner";
import RecipeDetailComponent from "../components/RecipeDetailComponent";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import SearchResults from "../components/SearchResults";
import Loader from "../components/Loader/Loader";

interface RecipeDetailsData {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
  ingredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
  }>;
  instructions: Array<{ number: number; instruction: string }>;
}

const RecipeDetails: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsData | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecipeDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/recipes/${recipeId}`);
      setRecipeDetails(response.data.recipeDetails);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      toast.error("Failed to fetch recipe details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [recipeId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-16 sm:ml-20 md:ml-24 lg:ml-28">
        <Header onSearch={handleSearchResults} />
        <main className="p-8 bg-[#EDEDED]">
          {searchResults.length > 0 ? (
            <SearchResults results={searchResults} />
          ) : (
            recipeDetails && (
              <RecipeDetailComponent recipeDetails={recipeDetails} />
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default RecipeDetails;
