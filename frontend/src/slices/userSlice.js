import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
  user: {},
  error: false,
  loading: false,
  success: false,
  message: null,
};

export const profile = createAsyncThunk("user/profile", async (user, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  const data = await userService.profile(user, token);
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = false;
        state.success = true;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
