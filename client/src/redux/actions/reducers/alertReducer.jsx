import { createReducer } from "@reduxjs/toolkit";

const initialData = {
  loading: false,
};

export const alertReducer = createReducer(initialData, {
  loading: (state, action) => {
    return { ...state, ...{ loading: action.payload } };
  },
});
