import axios from "axios";

const api = axios.create({
  baseURL: "https://bikeventure-1.onrender.com/",
  // baseURL: "http://localhost:5000",
});

const user = JSON.parse(localStorage.getItem("user"));
const token = user ? user.token : null;

export const getAllBikes = () => async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await api.get("/api/bikes/getallbikes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "GET_ALL_BIKES", payload: response.data });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
  }
};
