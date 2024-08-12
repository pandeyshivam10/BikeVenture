import axios from "axios";
import { message } from "antd";

const api = axios.create({
  baseURL: "https://bikeventure-1.onrender.com/",
  // baseURL: "http://localhost:5000",
});

// change baseURL to your own URL

export const googleLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.post("/api/users/googleLogin", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login Success");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "loading", payload: false });
  }
};

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login Success");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Username and Password do not match");
    dispatch({ type: "loading", payload: false });
  }
};
export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const checkEmailResponse = await api.post("/api/users/checkEmail", {
      email: reqObj.email,
    });

    if (checkEmailResponse.data.exists) {
      message.error("Email is already taken");
      dispatch({ type: "loading", payload: false });
      return;
    }

    const checkUsernameResponse = await api.post("/api/users/checkUsername", {
      username: reqObj.username,
    });

    if (checkUsernameResponse.data.exists) {
      message.error("Username is already taken");
      dispatch({ type: "loading", payload: false });
      return;
    }

    // If the username is available, proceed with the registration process
    await api.post("/api/users/register", reqObj);

    message.success("Registration Successful");

    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "loading", payload: false });
  }
};

export const getOTP = (reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.post("/api/users/getOTP", reqObj);
    dispatch({ type: "setValidEmail", payload: true });
    console.log(response);
    message.success("Otp Sent to your registered email")
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.error(error);
    dispatch({ type: "loading", payload: false });
  }
};


export const verifyOtp =  (reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.post("/api/users/verifyOtp", reqObj);
    console.log(response)
    dispatch({ type: "setValidOtp", payload: true });
    message.success("Otp Matched");
    console.log(response);
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.error(error);
    message.error("Otp not matched");
    dispatch({ type: "loading", payload: false });
  }
};


export const passwordChanged = (reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.post("/api/users/changePassword", reqObj);
    console.log(response);
    message.success("Password Changed Succesfully")
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.error(error);
    dispatch({ type: "loading", payload: false });
  }
};