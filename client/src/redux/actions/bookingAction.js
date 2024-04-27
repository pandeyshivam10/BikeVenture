import { message } from "antd";
import axios from "axios";

const api = axios.create({
  baseURL: "https://scary-earmuffs-foal.cyclic.app/",
  // baseURL: "http://localhost:5000",
});

// Get token from localStorage and parse it as JSON
const user = JSON.parse(localStorage.getItem("user"));
const token = user ? user.token : null;
// console.log(token);

export const bookingBike = (reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    await api.post("/api/bookings/bookbike", reqObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    message.success("Your Bike Booked Succesfully");
    window.location.href = "/bookings";

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
    message.error("Something went Wrong...");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.get("/api/bookings/getallbookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
    message.error("Something went Wrong...");
  }
};
