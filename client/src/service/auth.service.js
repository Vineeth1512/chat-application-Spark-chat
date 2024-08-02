import axios from "axios";
const AUTH_URL = "http://localhost:8000/auth";

class AuthService {
  SignUp(user) {
    return axios.post(`${AUTH_URL}/signup`, user, { credentials: "include" });
  }
  Login(user) {
    return axios.post(`${AUTH_URL}/login`, user);
  }
  Logout() {
    return axios.post(`${AUTH_URL}/logout`);
  }
}
export default new AuthService();
