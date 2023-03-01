import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import popupReducer from './slices/popupSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  popups: popupReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
