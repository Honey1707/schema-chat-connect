import axios from "axios";

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/users/login",
      { email, password },
      { withCredentials: true }
    );
    console.log("Login successful");
    return response.data.id;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.detail || "Login failed. Please try again.");
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};