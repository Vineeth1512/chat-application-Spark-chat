const AUTH_URL = "http://localhost:8000/auth";

class AuthAPIs {
  async SignUp(user) {
    try {
      const response = await fetch(`${AUTH_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred during signup");
      }
      return await response.json();
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }
}
export default new AuthAPIs();
