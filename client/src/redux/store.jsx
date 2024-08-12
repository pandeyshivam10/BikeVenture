import { configureStore } from "@reduxjs/toolkit";
import { bikeReducer } from "./actions/reducers/bikeReducer";
import { alertReducer } from "./actions/reducers/alertReducer";
import { bookingReducer } from "./actions/reducers/bookingReducer";
import { validEmail } from "./actions/reducers/validEmail";
import { validOtp } from "./actions/reducers/validOtp";

const store = configureStore({
  reducer: {
    custom: bikeReducer,
    custom1: alertReducer,
    custom2: bookingReducer,
    custom3: validEmail,
    custom4: validOtp,
  },
});

export default store;
