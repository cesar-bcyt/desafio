import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { closeSnackbar } from '../Redux/slices/snackbarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';

export default function Contenedor(props: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const open = useSelector((state: any) => state.snackbar.open);
    const duration = useSelector((state: any) => state.snackbar.duration);
    const message = useSelector((state: any) => state.snackbar.message);
    const severity = useSelector((state: any) => state.snackbar.severity);

    return (
        <div id='contenedor'>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={duration ? duration : 5000}
                onClose={() => dispatch(closeSnackbar())}>
                    <Alert onClose={() => dispatch(closeSnackbar())} severity={severity}>
                        {message}
                    </Alert>
            </Snackbar>
            {props.children}
        </div>
    )
}