import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../store/userSlice";
import { toast } from "sonner";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, email } = useSelector((state: any) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Welcome, {firstName}!
        </h1>
        <p className="text-gray-600 mb-8">You are logged in as {email}.</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Home;
