import React, { useState } from "react";
import "./Servicio.css";
import { saveServicio } from "../../services/unidadService";

const Servicio = () => {

    const [formData, setFormData] = useState({
        id: "",
        horasServicio: "",
        fechaServicio: ""
    });

    const handleService = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { id, horasServicio, fechaServicio } = formData;

        try {
            const response = await saveServicio(
                id,
                horasServicio,
                fechaServicio
            );

            console.log("Servicio guardado:", response);

            setFormData({ id: "", horasServicio: "", fechaServicio: "" });

        } catch (error) {
            console.error("Error al guardar el servicio:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}> 
            
            <div className="servicio-main-container">
                <h1>Servicio de motor</h1>
                
                <div className="form-field">
                    <label htmlFor="id">Unidad: </label>
                    <input 
                        type="text" 
                        name="id" 
                        id="id" 
                        value={formData.id} 
                        onChange={handleService}
                    />
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

                <button type="submit">
                    Guardar
                </button>
            </div>

        </form>
    );
};

export default Servicio;
