import { createReducer } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  validOtp: false, // false by default, indicating no OTP validity yet
};

// Create reducer with @reduxjs/toolkit
export const validOtp = createReducer(initialState, {
  // Action to set OTP validity
  setValidOtp: (state, action) => {
    state.validOtp = action.payload; // Update validOtp based on action payload
  },
});


