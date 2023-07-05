import { createReducer } from "@reduxjs/toolkit";

const initialData = {
  bikes: [],
};

export const bikeReducer = createReducer(initialData, {

  GET_ALL_BIKES: (state, action) => {
    return { ...state, ...{ bikes: action.payload } };
  },
 
});
