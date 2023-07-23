import axios from "axios";

const api = axios.create({
  baseURL: "https://clear-rose-newt.cyclic.app",
  // baseURL: "http://localhost:5000",
});


// server side

export const getAllBikes = () => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.get("/api/bikes/getallbikes");
    dispatch({ type: "GET_ALL_BIKES", payload: response.data });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
  }
};
