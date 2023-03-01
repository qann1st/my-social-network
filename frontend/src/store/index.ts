import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import popupReducer from './slices/popupSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  popups: popupReducer,
  user: userReducer,
  theme: themeReducer,
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
