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
    window.location.href = '/bookings';

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
    const response  = await api.get("/api/bookings/getallbookings");
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
    message.error("Something went Wrong...");
  }

};
