import { createReducer } from "@reduxjs/toolkit";

const initialData = {
  bookings: [],
};

export const bookingReducer = createReducer(initialData, {
  GET_ALL_BOOKINGS: (state, action) => {
    return { ...state, ...{ bookings: action.payload } };
  },
});
