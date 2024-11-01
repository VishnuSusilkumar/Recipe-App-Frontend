import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import SubLoader from "../components/Loader/SubLoader";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginError, setLoginError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (email) {
      navigate("/", { replace: true });
    }
  }, [email, navigate]);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values: LoginFormValues) => {
      setLoginError("");
      setLoading(true);
      try {
        const res = await axiosInstance.post("/auth/login", values);

        if (res.status === 200) {
          const user = res.data.user;
          dispatch(
            setUser({
              name: user.name,
              email: user.email,
              token: "",
            })
          );

          toast.success("Login successful!");
          navigate("/", { replace: true });
        } else {
          setLoginError(
            "Unexpected response from the server. Please try again."
          );
          toast.error("Login failed. Please try again.");
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
        setLoginError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EDEDED]">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Recipe Application
        </h1>
        <p className="text-center text-gray-600 mb-6">
          "The secret ingredient is already within you—let’s get cooking!"
        </p>

        <form onSubmit={formik.handleSubmit}>
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

          {loginError && (
            <div className="mb-4 text-sm text-red-600">{loginError}</div>
          )}

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <SubLoader /> : "Log In"}
            </button>
          </div>

          <p className="text-center mt-4 text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
