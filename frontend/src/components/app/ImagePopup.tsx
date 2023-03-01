import { Close } from '@mui/icons-material';
import { Backdrop, Card } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { handleCloseImagePopup } from '../../store/slices/popupSlice';

const ImagePopup = () => {
  const { imageIsOpen, imageLink } = useAppSelector((state) => state.popups);
  const dispatch = useAppDispatch();

  return (
    <Backdrop
      sx={{ zIndex: 20000 }}
      open={imageIsOpen}
      onClick={() => {
        dispatch(handleCloseImagePopup());
      }}>
      <Card sx={{ position: 'relative' }}>
        <Close
          fontSize={'large'}
          sx={{
            color: 'white',
            position: 'absolute',
            top: '0',
            right: '0',
            cursor: 'pointer',
            transition: 'all .2s ease-in-out',
            width: '32px',
            '&:hover': {
              opacity: 0.6,
            },
          }}
        />
        <img
          alt="Картинка"
          style={{
            maxHeight: '75vh',
            maxWidth: '75vw',
            display: 'block',
          }}
          src={imageLink}
        />
      </Card>
    </Backdrop>
  );
};

export default ImagePopup;
