import axios from "axios";
import { message } from "antd";

const api = axios.create({
  baseURL: "https://bikeventure-1.onrender.com/",
  // baseURL: "http://localhost:5000",
});

export const editUser = (id, reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.patch(`/api/users/edit/${id}`, reqObj);

    // Check if the response contains expected data
    if (response && response.data) {
      const userData = JSON.parse(localStorage.getItem("user")) || {};

      userData.data.user = response.data.senduser;

      localStorage.setItem("user", JSON.stringify(userData));

      message.success("Edit Success");
      setTimeout(() => {
        window.location.href = `/profile/${id}`;
      }, 500);
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    if (error.response.status === 409) {
      message.error("Email already exists");
      return;
    }
    if (error.response.status === 410) {
      message.error("Username already exists");
      return;
    }
    console.log(error);
    message.error("Edit Failed");
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};
