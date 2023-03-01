import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  imageIsOpen: boolean;
  imageLink: string;
}
interface IPropPopup {
  imageIsOpen?: boolean;
  imageLink: string;
}
const initialState: PopupState = {
  imageIsOpen: false,
  imageLink: '',
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    handleOpenImagePopup(state, action: PayloadAction<IPropPopup>) {
      state.imageIsOpen = true;
      state.imageLink = action.payload.imageLink;
    },
    handleCloseImagePopup(state) {
      state.imageIsOpen = false;
    },
  },
});

export const { handleOpenImagePopup, handleCloseImagePopup } = popupSlice.actions;

export default popupSlice.reducer;
