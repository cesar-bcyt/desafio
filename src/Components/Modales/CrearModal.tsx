import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Label, Modal } from 'semantic-ui-react';
import agent from '../../API/agent';
import ReloadContext from '../../Context/ReloadContext';
import Tutorial from '../../Domain/Tutorial';
import { openSnackbar } from '../../Redux/slices/snackbarSlice';
import DatoFormulario from '../DatoFormulario';

const tutorialDefault: Tutorial = {
    id: -1,
    nombre: '',
    profesor: '',
    materia: '',
    fecha: '',
}

export default function BorrarModal() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tutorial, setTutorial] = useState<Tutorial>(tutorialDefault);
    const [puedeGuardar, setPuedeGuardar] = useState<boolean>(false);
    const dispatch = useDispatch();
    const reload = useContext(ReloadContext);

    const guardar = () => {
        setLoading(true);
        agent.Tutoriales.create(tutorial)
            .then(res => {
                setLoading(false);
                setOpen(false);
                dispatch(openSnackbar({ message: "Tutorial guardado", severity: "success" }));
                reload();
            })
            .catch(err => {
                setLoading(false);
                dispatch(openSnackbar({ message: "Error al guardar el tutorial", severity: "error" }));
            })
    }

    const cambiarValorTutorial = (dato: string, valor: string) => {
        if (Object.keys(tutorial).includes(dato)) {
            setTutorial({ ...tutorial, [dato]: valor });
        }
    }

    useEffect(() => {
        setPuedeGuardar(!!(tutorial.nombre && tutorial.profesor && tutorial.materia && tutorial.fecha));
    }, [tutorial]);

    return (
        <Modal
            closeIcon
            onClose={(() => setOpen(false))}
            onOpen={() => setOpen(true)}
            open={open}
            size="tiny"
            trigger={
                <Button primary content='Crear Tutorial' />
            }
        >
            <Modal.Header>Crear nuevo tutorial</Modal.Header>
            <Modal.Content>
                <p>Ingrese los datos del nuevo tutorial aquí</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <DatoFormulario
                        label='Título'
                        onChange={(e: any) => cambiarValorTutorial('nombre', e.target.value)}
                        value={tutorial.nombre}
                    />
                    <DatoFormulario
                        label='Profesor'
                        onChange={(e: any) => cambiarValorTutorial('profesor', e.target.value)}
                        value={tutorial.profesor}
                    />
                    <DatoFormulario
                        label='Materia'
                        onChange={(e: any) => cambiarValorTutorial('materia', e.target.value)}
                        value={tutorial.materia}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
                        <div style={{ width: '170px' }}>
                            <Label style={{ width: '170px', height: '38px', display: 'flex', alignItems: 'center' }}>
                                Fecha
                            </Label>
                        </div>
                        <SemanticDatepicker
                            locale='es-ES'
                            onChange={(e, data: any) => cambiarValorTutorial('fecha', data.value)}
                        />
                    </div>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button secondary onClick={() => setOpen(false)}>Cancelar</Button>
                <Button disabled={!puedeGuardar} primary loading={loading} onClick={guardar}>Guardar</Button>
            </Modal.Actions>
        </Modal>
    );
}