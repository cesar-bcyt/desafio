import { configureStore } from '@reduxjs/toolkit';
import snackbarSlice from './slices/snackbarSlice';

export default configureStore({
    reducer: {
        snackbar: snackbarSlice,
    },
});