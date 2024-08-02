import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await response.json();

      console.log(data);
      toast.success(data.message);
      localStorage.setItem("chat-user", JSON.stringify(response.data));
      setAuthUser(data);
    } catch (error) {
      console.log(error);
      if (error && error.data) {
        toast.error(error.message);
      } else {
        toast.error("Request failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  // if (password !== confirmPassword) {
  //   toast.error("Passwords do not match..!");
  //   return false;
  // }
  if (password.length < 5) {
    toast.error("Password must be atleast 5 characters..");
    return false;
  }
  return true;
}
