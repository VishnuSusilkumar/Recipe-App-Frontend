import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  token: string | null;
}

const initialState: UserState = {
  name: "",
  email: "",
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { name, email, token } = action.payload;
      state.name = name;
      state.email = email;
      state.token = token;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
