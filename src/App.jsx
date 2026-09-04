import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import Bitacoras from "./pages/Bitacoras/Bitacoras";
import Unidades from "./pages/Unidades/Unidades";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nueva-bitacora" element={<Form />} />
        <Route path="/bitacoras" element={<Bitacoras />} />
        <Route path="/unidades" element={<Unidades/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;