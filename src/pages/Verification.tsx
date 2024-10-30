import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import OTPInput from "react-otp-input";
import { clearUser } from "../store/userSlice";
import SubLoader from "../components/Loader/SubLoader";

interface VerificationFormValues {
  activationCode: string;
}

const Verification: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);

  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik<VerificationFormValues>({
    initialValues: {
      activationCode: "",
    },
    validationSchema: Yup.object({
      activationCode: Yup.string()
        .required("Activation code is required")
        .length(4, "Activation code must be 4 digits"),
    }),
    onSubmit: async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post("/auth/activate", {
          token,
          activationCode: otp,
        });

        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(clearUser());
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error: any) {
        console.error("Activation error:", error);
        const errorMessage =
          error.response?.data?.message ||
          "Activation failed. Please try again.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EDEDED]">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Recipe Application
        </h1>
        <p className="text-center text-gray-600 mb-6">
          "We're almost ready to serve. Verify to unlock delicious
          possibilities."
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="activationCode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Activation Code
            </label>
            <div className="flex justify-center">
              <OTPInput
                value={otp}
                onChange={(value: string) => {
                  if (/^\d*$/.test(value)) {
                    setOtp(value);
                    formik.setFieldValue("activationCode", value);
                  }
                }}
                numInputs={4}
                inputStyle={{
                  width: "2.5rem",
                  height: "2.5rem",
                  margin: "0 0.25rem",
                  fontSize: "1.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #d1d5db",
                  textAlign: "center",
                }}
                renderInput={(props) => (
                  <input {...props} className="focus:border-indigo-500" />
                )}
              />
            </div>
            {formik.touched.activationCode && formik.errors.activationCode && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.activationCode}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={otp.length < 4 || loading}
            >
              {loading ? <SubLoader /> : "Verify Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
