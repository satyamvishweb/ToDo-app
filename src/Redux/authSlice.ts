import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoUrl?: string | null;  // Optional: photo URL
  } | null;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("user") || "null"), // Initialize from localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState["user"]>) {
      state.user = action.payload;
      // Store user in localStorage when set
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.user = null;
      // Clear user from localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
