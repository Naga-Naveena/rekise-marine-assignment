import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lineCoordinates: [],
  lineIndex: 0,
  position: "before",
  polyCoordinates: [],
};

const dataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    addLineCoordinate: (state, action) => {
      state.lineCoordinates.push(action.payload);
    },
    // Update the current line index
    setLineIndex: (state, action) => {
      state.lineIndex = action.payload;
    },
    // Update the position
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    // Add a new coordinate to the polyCoordinates array
    addPolyCoordinate: (state, action) => {
      state.polyCoordinates.push(action.payload);
    },
    // Reset the entire state to its initial values
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addLineCoordinate,
  setLineIndex,
  setPosition,
  addPolyCoordinate,
  resetState,
} = dataSlice.actions;
export default dataSlice.reducer;
