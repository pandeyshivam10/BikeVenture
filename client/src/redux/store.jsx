import { configureStore } from "@reduxjs/toolkit";
import { bikeReducer } from "./actions/reducers/bikeReducer";
import { alertReducer } from "./actions/reducers/alertReducer";


const store = configureStore({
  reducer: {
    custom: bikeReducer,
    custom1: alertReducer
  },
});

export default store;
