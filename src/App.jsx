import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import Bitacoras from "./pages/Bitacoras/Bitacoras";
import Unidades from "./pages/Unidades/Unidades";
import Servicio from "./pages/Servicio/Servicio";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nueva-bitacora" element={<Form />} />
        <Route path="/bitacoras" element={<Bitacoras />} />
        <Route path="/unidades" element={<Unidades/>}></Route>
        <Route path="/servicio" element={<Servicio/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;