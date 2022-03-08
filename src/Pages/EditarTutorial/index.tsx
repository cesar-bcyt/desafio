import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Label } from 'semantic-ui-react';
import agent from '../../API/agent';
import DatoFormulario from '../../Components/DatoFormulario';
import Header from '../../Components/Header';
import Tutorial from '../../Domain/Tutorial';
import { openSnackbar } from '../../Redux/slices/snackbarSlice';

const tutorialDefault: Tutorial = {
    id: -1,
    nombre: 'cargando...',
    profesor: 'cargando...',
    materia: 'cargando...',
    fecha: 'cargando...',
}

export default function EditarTutorial() {
    const params = useParams();
    const { tutorialId } = params;
    const [editando, setEditando] = useState<boolean>(false);
    const [tutorial, setTutorial] = useState<Tutorial>(tutorialDefault);
    const [tutorialOriginal, setTutorialOriginal] = useState<Tutorial>(tutorialDefault);
    const [fecha, setFecha] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingBorrar, setLoadingBorrar] = useState<boolean>(false);
    const [cambiado, setCambiado] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        agent.Tutoriales.details(Number(tutorialId))
            .then((res: Tutorial) => {
                setTutorial(res);
                setTutorialOriginal(res);
                setCambiado(false);
            })
            .catch(err => {
                dispatch(openSnackbar({ message: "Error al cargar el tutorial", severity: "error" }));
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tutorialId])

    useEffect(() => {
        setCambiado(tutorial !== tutorialOriginal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tutorial])

    const borrar = () => {
        setLoadingBorrar(true);
        agent.Tutoriales.delete(tutorial.id)
            .then(() => {
                setLoadingBorrar(false);
                dispatch(openSnackbar({ message: "Tutorial borrado", severity: "success" }));
                navigate('/');
            })
            .catch(err => {
                setLoadingBorrar(false);
                dispatch(openSnackbar({ message: "Error al borrar el tutorial", severity: "error" }));
            })
    }

    const guardar = () => {
        setLoading(true);
        agent.Tutoriales.update(Number(tutorialId), tutorial)
            .then(res => {
                setLoading(false);
                setTutorialOriginal(tutorial);
                dispatch(openSnackbar({ message: "Tutorial guardado", severity: "success" }));
            })
            .catch(err => {
                dispatch(openSnackbar({ message: "Error al guardar el tutorial", severity: "error" }));
            })
    }

    const cambiarValorTutorial = (dato: string, valor: string) => {
        if (Object.keys(tutorial).includes(dato)) {
            setTutorial({ ...tutorial, [dato]: valor });
        }
    }

    useEffect(() => {
        if (tutorial.fecha !== tutorialDefault.fecha) {
            setFecha(new Date(tutorial.fecha));
        }
    }, [tutorial.fecha]);

    const navigate = useNavigate();

    return (
        <div>
            <Header title="Modificar tutorial" icon='angle left' onClick={() => navigate(`/tutoriales/${tutorialId}`)} icon2='pencil' onClick2={() => setEditando(!editando)} />
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                        value={fecha}
                        onChange={(e, data: any) => cambiarValorTutorial('fecha', data.value)}
                    />
                </div>
            </div>
            <div style={{ paddingLeft: '10px', position: 'fixed', zIndex: 1, bottom: 10, width: '485px', display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'space-between' }}>
                <Button loading={loadingBorrar} onClick={borrar} style={{ color: 'white', backgroundColor: 'red' }}>Borrar tutorial</Button>
                <Button loading={loading} disabled={!cambiado} primary onClick={guardar}>Guardar cambios</Button> 
            </div>
        </div>
    );
};