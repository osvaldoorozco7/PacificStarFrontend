import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const cerrarMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <h2 className="logo" onClick={() => navigate("/")}>Pacific Star</h2>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className="desktop-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/nueva-bitacora">Nueva bitácora</Link></li>
          <li><Link to="/bitacoras">Bitácoras</Link></li>
          <li><Link to="/unidades"> Unidades</Link></li>
          <li><Link to="/servicio">Agregar servicio</Link></li>
        </ul>
      </nav>

      <div className={menuOpen ? "overlay active" : "overlay"} onClick={cerrarMenu}/>

      <aside className={menuOpen ? "sidebar active" : "sidebar"}>
        <button className="close" onClick={cerrarMenu}>
          ✕
        </button>

        <Link to="/" onClick={cerrarMenu}>
          Inicio
        </Link>

        <Link to="/nueva-bitacora" onClick={cerrarMenu}>
          Nueva bitácora
        </Link>

        <Link to="/bitacoras" onClick={cerrarMenu}>
          Bitacoras
        </Link>

        <Link to="/unidades" onClick={cerrarMenu}>
          Unidades
        </Link>

        <Link to="/servicio" onClick={cerrarMenu}>
          Agregar servicio
        </Link>
      </aside>
    </>
  );
}

export default Navbar;