import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: object | null;
  isAuth: boolean;
}

const initialState: UserState = {
  data: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser(state) {
      state.data = null;
      state.isAuth = false;
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.isAuth = true;
    },
  },
});

export const { removeUser, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
