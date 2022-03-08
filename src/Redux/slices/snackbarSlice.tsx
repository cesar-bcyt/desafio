import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        open: false,
        message: '',
        severity: 'success',
        duration: 5000,
    },
    reducers: {
        openSnackbar: (state, action: { payload: { message: string, severity: string, duration?: number }}) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.duration = action.payload.duration || 5000;
        },
        closeSnackbar(state) {
            state.open = false;
        }
    }
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;