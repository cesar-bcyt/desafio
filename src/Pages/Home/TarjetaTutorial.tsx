import React from 'react';
import { Link } from 'react-router-dom';
import Tutorial from '../../Domain/Tutorial';

interface Props {
    tutorial: Tutorial;
}

export default function TarjetaTutorial(props: Props) {
    const { tutorial } = props;

    const fecha = (new Date(tutorial.fecha)).toLocaleDateString('es-CL');

    return (
        <Link to={`/tutoriales/${tutorial.id}`} className='tarjeta'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <b>{tutorial.nombre}</b>
                <p className='dato'>{tutorial.profesor}</p>
            </div>
            <div>
                <p className='dato'>{fecha}</p>
            </div>
        </Link>
    )
}