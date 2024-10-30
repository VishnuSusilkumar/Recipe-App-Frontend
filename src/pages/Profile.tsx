import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/userSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import ProfileComponent from "../components/ProfileComponent";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader/Loader";
import axiosInstance from "../axios/axiosInstance";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogout = async () => {
    await axiosInstance.post("auth/logout");
    dispatch(clearUser());
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("auth/profile");
      if (response.data.success) {
        setUserProfile(response.data.user);
        
      } else {
        toast.error("Failed to fetch user profile.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-16 sm:ml-20 md:ml-24 lg:ml-28">
        <Header onSearch={handleSearchResults} />
        <main className="p-8 bg-[#EDEDED]">
          {loading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                />
              ))}
            </div>
          ) : userProfile ? (
            <ProfileComponent
              name={userProfile.name}
              email={userProfile.email}
              avatar={userProfile.photo}
              onLogout={handleLogout}
            />
          ) : (
            <p>User profile not found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
