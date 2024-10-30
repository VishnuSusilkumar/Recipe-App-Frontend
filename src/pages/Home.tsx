import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { toast } from "sonner";
import axiosInstance from "../axios/axiosInstance";
import SearchResults from "../components/SearchResults";
import RecipeGrid from "../components/RecipeGrid";
import Loader from "../components/Loader/Loader";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecipes = async () => {
    try {
      const response = await axiosInstance.get("/recipes/all");
      setRecipes(response.data.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

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
            <RecipeGrid recipes={recipes} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;