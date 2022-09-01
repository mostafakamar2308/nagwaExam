import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    updateFN: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateFN } = userSlice.actions;
export default userSlice.reducer;
