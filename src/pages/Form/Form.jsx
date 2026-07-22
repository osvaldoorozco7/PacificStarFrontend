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

                console.log(data);

                setUnidades(data);
            } catch (error) {
                console.error(error);
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
                <select
                    id="unidades"
                    name="unidad"
                    value={formData.unidad}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            unidad: e.target.value,
                        })
                        }
                >
                <option value="">Seleccione una unidad</option>

                {unidades.map((unidad) => (
                    <option
                        key={unidad.numeroUnidad}
                        value={unidad.numeroUnidad}
                    >
                        {unidad.numeroUnidad}
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