import { createReducer } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  validEmail: false, // Default to false, meaning no valid email yet
};

// Create reducer with @reduxjs/toolkit
export const validEmail = createReducer(initialState, {
  // Action to set email validity
  setValidEmail: (state, action) => {
    state.validEmail = action.payload; // Update validEmail based on action payload
  },
});
