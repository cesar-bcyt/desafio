import axios, { AxiosResponse } from 'axios';
import Tutorial from '../Domain/Tutorial';

axios.defaults.baseURL = "https://rayentutorialtestapp.azurewebsites.net";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Tutoriales = {
    list: () => requests.get('/tutorials'),
    details: (tutorialId: number) => requests.get(`/tutorials/${tutorialId}`),
    searchByDescription: (query: string) => requests.get(`/tutorial?description=${query}`),
    create: (body: Tutorial) => requests.post('/createtutorial', { nombre: body.nombre, profesor: body.profesor, materia: body.materia, fecha: body.fecha }),
    update: (tutorialId: number, body: Tutorial) => requests.put(`/updatetutorial/${tutorialId}`, body),
    delete: (tutorialId: number) => requests.delete(`/deletetutorial/${tutorialId}`),
    deleteAll: () => requests.delete(`/deletetutorials`),
}

const agent = {
    Tutoriales
}

export default agent;