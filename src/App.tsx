import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Signup from "./pages/Signup";
import Verification from "./pages/Verification";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import RecipeDetails from "./pages/RecipeDetails";
import SavedRecipes from "./pages/SavedRecipes";
import SavedRecipeDetailsPage from "./pages/SavedRecipeDetails";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route
            path="/recipes/saved-recipes/:savedRecipeId"
            element={<SavedRecipeDetailsPage />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
