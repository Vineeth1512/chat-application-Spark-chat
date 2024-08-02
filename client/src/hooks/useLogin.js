import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = handleInputErrors({
      username,
      password,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8000/auth/login",
        {
          method: "POST",
          credentials: "include", // Important for sending cookies
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({ username, password }),
        },
        { withCredentials: true }
      );

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message);
      }
      toast.success(response.message);
      localStorage.setItem("chat-user", JSON.stringify(response));
      setAuthUser(response);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("All fields are required..!");
    return false;
  }

  return true;
}
