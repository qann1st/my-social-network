import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  avatar: string | null;
  description: string;
  isAuth: boolean;
}

const initialState: UserState = {
  name: '',
  avatar: null,
  description: '',
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser(state) {
      state.name = '';
      state.avatar = null;
      state.description = '';
      state.isAuth = false;
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.description = action.payload.description;
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const { removeUser, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
