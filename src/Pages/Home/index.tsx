import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dropdown, Icon, Input } from 'semantic-ui-react';
import agent from '../../API/agent';
import Header from '../../Components/Header';
import BorrarModal from '../../Components/Modales/BorrarModal';
import CrearModal from '../../Components/Modales/CrearModal';
import ReloadContext from '../../Context/ReloadContext';
import Tutorial from '../../Domain/Tutorial';
import { openSnackbar } from '../../Redux/slices/snackbarSlice';
import TarjetaTutorial from './TarjetaTutorial';

const opcionesDeOrden = [
    {
        id: 1,
        text: 'Título',
        value: 'Título'
    },
    {
        id: 2,
        text: 'Fecha',
        value: 'Fecha'
    },
];

export default function Home() {
    const [tutoriales, setTutoriales] = useState<Tutorial[]>([]);
    const [busqueda, setBusqueda] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [buscando, setBuscando] = useState<boolean>(false);
    const [orden, setOrden] = useState<'Título' | 'Fecha'>('Título');
    const dispatch = useDispatch();

    const buscar = () => {
        setBuscando(true);
        agent.Tutoriales.searchByDescription(busqueda)
            .then((res: Tutorial[]) => {
                setTutoriales(res);
                setBuscando(false);
            })
            .catch(err => {
                dispatch(openSnackbar({message: "Error al cargar los tutoriales", severity: "error"}));
                setBuscando(false);
            });
    }

    useEffect(() => {
        if (orden === 'Fecha') {
            setTutoriales([...tutoriales].sort((a,b)=>(new Date(a.fecha).getTime()-(new Date(b.fecha)).getTime())));
        } else if (orden === 'Título') {
            setTutoriales([...tutoriales].sort((a, b) => a.nombre > b.nombre ? 1 : -1));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orden, tutoriales.length]);

    const cargarTutoriales = () => {
        setLoading(true);
        agent.Tutoriales.list()
            .then((res: Tutorial[]) => {
                setLoading(false);
                const _tutoriales = res.sort((a, b) => a.nombre.localeCompare(b.nombre));
                setTutoriales(_tutoriales);
            })
            .catch(err => {
                setLoading(false);
                dispatch(openSnackbar({message: "Error al cargar los tutoriales", severity: "error"}));
            })
    }

    useEffect(() => {
        cargarTutoriales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div>
            <Header title="Tutoriales" icon='graduation cap' />
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <Input style={{ width: '100%' }} value={busqueda} onChange={e => setBusqueda(e.target.value)} icon='search' iconPosition='left' onKeyDown={(e: any) => {e.key === 'Enter' && buscar()}} />
                    <Button loading={buscando} primary onClick={buscar}>Buscar</Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                        <div style={{ color: 'gray' }}>Ordenar por</div>
                        <Dropdown
                            selection
                            options={opcionesDeOrden}
                            onChange={(e, { value }) => setOrden(value as 'Título' | 'Fecha')}
                            value={orden}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {
                        loading ?
                        <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon loading name='spinner' size='large' />
                        </div>
                        :
                        tutoriales.map((tutorial, index) => (
                            <TarjetaTutorial key={index} tutorial={tutorial} />
                        ))
                    }
                    {
                        !loading && tutoriales.length === 0 &&
                        <div style={{ margin: 'auto', marginTop: '10px' }}>
                            No se encontraron tutoriales
                        </div>
                    }
                </div>
                <div style={{ position: 'fixed', zIndex: 1, bottom: 10, width: '485px', display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'space-between' }}>
                    <ReloadContext.Provider value={cargarTutoriales}>
                        <BorrarModal />
                        <CrearModal />
                    </ReloadContext.Provider>
                </div>
            </div>
        </div>
    );
};