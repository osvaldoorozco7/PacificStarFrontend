import React, { useEffect, useState } from "react";
import "./Form.css";
import { getUnidades } from "../../services/unidadService";

const Form = () => {
    
    const [unidades, setUnidades] = useState([]);
    const revisiones = ["Primera", "Segunda", "Tercera"];
    const [formData, setFormData] = useState({
        unidad: "",
        fecha: "",
        observaciones: ""
    });

    useEffect(() => {
        const cargarUnidades = async () => {
            try {
                const data = await getUnidades();
                setUnidades(data);
            } catch (error) {
                console.error("Error al obtener las unidades", error);
            }
        };
        cargarUnidades();
        }, []);

    return(
        <form className="main-container">
            <h2>Inspección</h2>

            <h3>Datos</h3>
            <div className="formDate">
                <label htmlFor="">Unidad: </label>
                <select id="unidades" name="unidades">
                    {unidades.map((unidades) => (
                        <option key={unidad} value={unidad}>
                            {unidad}
                        </option>
                    ))}
                </select>

                <label htmlFor="">Fecha </label>
                <input type="datetime-local" name="" id="" />
            </div>

            <h3>Temperaturas</h3>
            <div className="revisiones">
                {revisiones.map((revision, index) => (
                    <div key={index} className="revision">
                        <label>{revision} revision</label>
                        <input type="time" className="timeInput"/>
                        <br />
                        <label>Temperatura</label>
                        <input type="number" className="tempInput"/> °C
                    </div>
                ))}
            </div>

            <h3>Observaciones</h3>
            <input type="text" name="observaciones" id="observaciones" className="obsInput"/>
            <br />
            <button type="submit">Guardar</button>

        </form>
    )
}

export default Form;