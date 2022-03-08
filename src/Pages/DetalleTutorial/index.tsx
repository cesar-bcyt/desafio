import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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

export default function DetalleTutorial() {
    const params = useParams();
    const { tutorialId } = params;
    const [tutorial, setTutorial] = useState<Tutorial>(tutorialDefault);
    const dispatch = useDispatch();

    useEffect(() => {
        agent.Tutoriales.details(Number(tutorialId))
            .then((res: Tutorial) => {
                setTutorial(res);
            })
            .catch(err => {
                dispatch(openSnackbar({ message: "Error al cargar el tutorial", severity: "error" }));
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tutorialId])

    const navigate = useNavigate();

    const fecha = (new Date(tutorial.fecha)).toLocaleDateString('es-CL');

    return (
        <div>
            <Header title="Detalle tutorial" icon='angle left' onClick={() => navigate('/')} icon2='pencil' onClick2={() => navigate(`/tutoriales/${tutorialId}/editar`)} />
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <DatoFormulario
                    label='Título'
                    onChange={(e: any) => {}}
                    value={tutorial.nombre}
                    disabled
                />
                <DatoFormulario
                    label='Profesor'
                    onChange={(e: any) => {}}
                    value={tutorial.profesor}
                    disabled
                />
                <DatoFormulario
                    label='Materia'
                    onChange={(e: any) => {}}
                    value={tutorial.materia}
                    disabled
                />
                <DatoFormulario
                    label='Fecha'
                    onChange={(e: any) => {}}
                    value={fecha}
                    disabled
                />
            </div>
        </div>
    );
};