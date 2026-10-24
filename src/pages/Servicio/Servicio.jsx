import React from "react";
import "./Servicio.css";

const Servicio = () => {
    return(
            <form action="">
                
                <div className="servicio-main-container">
                    <h1>Servicio de motor</h1>
                    
                    <div className="form-field">
                        <label htmlFor="">Unidad: </label>
                        <input type="" value="" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="">Horas del motor: </label>
                        <input type="number" name="" id="" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="">Fecha del servicio: </label>
                        <input type="date" name="" id="" />
                    </div>

                    <button type="submit">
                        Guardar
                    </button>
                </div>

            </form>
    )
}

export default Servicio;