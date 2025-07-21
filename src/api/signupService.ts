import axios from "axios";

export const handleSignup = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/users/signup",
      { email, password },
      { withCredentials: true }
    );
    return response.data.id;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.detail || "Signup failed. Please try again.");
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};