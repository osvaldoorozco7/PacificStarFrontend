import React, { useEffect, useState } from "react";
import "./Servicio.css";
import { getUnidades, saveServicio } from "../../services/unidadService";
import { useNavigate } from "react-router-dom";

const Servicio = () => {
    const navigate = useNavigate();
    const [unidades, setUnidades] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        horasServicio: "",
        fechaServicio: ""
    });

    useEffect(() => {
        const cargarUnidades = async () => {
            try {
                const data = await getUnidades();
                setUnidades(data);
            } catch (error) {
                console.error("Error al obtener las unidades:", error)
            }
        };
        cargarUnidades();
    }, []);

    const handleService = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isDisabled) return;

        setIsDisabled(true);

        const { id, horasServicio, fechaServicio } = formData;

        try {
            const response = await saveServicio(
                id,
                horasServicio,
                fechaServicio
            );
            navigate("/");
        } catch (error) {
            console.error("Error al guardar el servicio:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}> 
            
            <div className="servicio-main-container">
                <h1>Servicio de motor</h1>
                
                <div className="form-field">
                    <label htmlFor="unidad">
                        Unidad:
                    </label>

                    <select
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleService}
                        required
                    >
                        <option value="">
                            Seleccione unidad
                        </option>

                        {unidades.map((unidad) => (
                            <option
                                key={unidad.numeroUnidad}
                                value={unidad.numeroUnidad}
                            >
                                {unidad.numeroUnidad}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="horasServicio">Horas del motor: </label>
                    <input 
                        type="number" 
                        name="horasServicio" 
                        id="horasServicio" 
                        value={formData.horasServicio}
                        onChange={handleService}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="fechaServicio">Fecha del servicio: </label>
                    <input 
                        type="date" 
                        name="fechaServicio" 
                        id="fechaServicio" 
                        value={formData.fechaServicio}
                        onChange={handleService}
                    />
                </div>

                <button type="submit" disabled={isDisabled}>
                    {isDisabled ? "Guardando..." : "Guardar"}
                </button>
            </div>

        </form>
    );
};

export default Servicio;
