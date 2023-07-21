import { message } from "antd";
import axios from "axios";

const api = axios.create({
  baseURL: "https://clear-rose-newt.cyclic.app",
  // baseURL: "http://localhost:5000",
});


export const bookingBike = (reqObj) => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    await api.post("/api/bookings/bookbike",reqObj);
    message.success("Your Bike Booked Succesfully");

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
    message.error("Something went Wrong...");
  }
};
