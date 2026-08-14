import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cerrarMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <h2 className="logo">Pacific Star</h2>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className="desktop-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/nueva-bitacora">Nueva Bitácora</Link></li>
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
          Nueva Bitácora
        </Link>
      </aside>
    </>
  );
}

export default Navbar;