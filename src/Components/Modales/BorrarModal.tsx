import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import agent from '../../API/agent';
import ReloadContext from '../../Context/ReloadContext';
import { openSnackbar } from '../../Redux/slices/snackbarSlice';

export default function BorrarModal() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const reload = useContext(ReloadContext);
    const dispatch = useDispatch();

    const borrarTodo = () => {
        setLoading(true);
        agent.Tutoriales.deleteAll()
            .then(res => {
                setLoading(false);
                setOpen(false);
                dispatch(openSnackbar({ message: "Todos los tutoriales han sido borrados", severity: "success" }));
                reload();
            })
    }

    return (
        <Modal
            closeIcon
            onClose={(() => setOpen(false))}
            onOpen={() => setOpen(true)}
            open={open}
            size="tiny"
            trigger={
                <Button className='deleteButtonRedOnHover' secondary>Borrar todo</Button>
            }
        >
            <Modal.Header>Borrar todos los tutoriales</Modal.Header>
            <Modal.Content>
                <p>¿Estás seguro que quieres borrar todos los tutoriales?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button secondary onClick={() => setOpen(false)}>Cancelar</Button>
                <Button loading={loading} onClick={borrarTodo} style={{ color: 'white', backgroundColor: 'red' }}>Borrar todo</Button>
            </Modal.Actions>
        </Modal>
    );
}