import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const authApi = {
  register: (email, password) =>
    instance
      .post("/register", {
        email,
        password,
      })
      .then((response) => response.data),
  login: (email, password) =>
    instance
      .post("/login", { email, password })
      .then((response) => response.data),
  logout: () => instance.get("/logout").then((response) => response.data),
  oAuthLogin: () => instance.get("/profile").then((response) => response.data),
};
