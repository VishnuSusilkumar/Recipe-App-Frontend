import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { toast } from "sonner";
import axiosInstance from "../axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

interface SignupFormValues {
  name: string; // Changed to a single name field
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      name: "", // Initialize name
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Name is required"), // Updated validation
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values: SignupFormValues) => {
      try {
        const res = await axiosInstance.post("/auth/register", {
          name: values.name, // Change to a single name field
          email: values.email,
          password: values.password,
        });
        if (res.status === 201) {
          dispatch(
            setUser({
              name: values.name, // Update to use the name field
              email: values.email,
              token: res.data.token,
            })
          );
          toast.success(
            "Registration successful! Redirecting to verification..."
          );
          navigate("/verification");
        } else {
          toast.error("Unexpected response from the server. Please try again.");
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Signup failed. Please try again.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-400 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          SIGN UP
        </h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.errors.name && formik.touched.name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...formik.getFieldProps("name")} // Use the name field
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>

          <p className="text-center mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
