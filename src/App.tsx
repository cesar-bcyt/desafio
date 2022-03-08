import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Contenedor from "./Components/Contenedor";
import EditarTutorial from "./Pages/EditarTutorial";
import DetalleTutorial from "./Pages/DetalleTutorial";

function App() {
  return (
    <Provider store={store}>
      <Contenedor>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutoriales/:tutorialId" element={<DetalleTutorial />} />
            <Route path="/tutoriales/:tutorialId/editar" element={<EditarTutorial />} />
          </Routes>
        </Router>
      </Contenedor>
    </Provider>
  );
}

export default App;