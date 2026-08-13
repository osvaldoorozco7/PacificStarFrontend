import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nueva-bitacora" element={<Form/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;