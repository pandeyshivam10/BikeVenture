import { configureStore } from "@reduxjs/toolkit";
import { bikeReducer } from "./actions/reducers/bikeReducer";
import { alertReducer } from "./actions/reducers/alertReducer";
import { bookingReducer } from "./actions/reducers/bookingReducer";


const store = configureStore({
  reducer: {
    custom: bikeReducer,
    custom1: alertReducer,
    custom2: bookingReducer,

  },
});

export default store;
