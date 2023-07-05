import axios from "axios";
import { message } from "antd";
const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login Success");
    setTimeout(() => {
      window.location.href='/'
    }, 500);

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went Wrong");
    dispatch({ type: "loading", payload: false });
  }
};
export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.post("/api/users/register", reqObj);

    message.success("Registration Successfull");

    setTimeout(() => {
      window.location.href='/login'
    }, 500);

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went Wrong");
    dispatch({ type: "loading", payload: false });
  }
};
