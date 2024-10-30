import axiosInstance from "../axios/axiosInstance";

export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    await axiosInstance.post("/auth/refresh-token", {}, { withCredentials: true });
    return true;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return false;
  }
};
