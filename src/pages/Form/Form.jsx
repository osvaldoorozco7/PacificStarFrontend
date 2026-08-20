import { useEffect, useState } from "react";
import "./Form.css";
import { getUnidades } from "../../services/unidadService";

const Form = () => {
    const [unidades, setUnidades] = useState([]);
    const combustible = ["Empty","1/8", "1/4", "3/8", "1/2", "5/8", "3/4", "7/8", "Full" ];
    const estado = ["Bueno", "Malo"];

    const [formData, setFormData] = useState(() => {
        const ahora = new Date();
        const offset = ahora.getTimezoneOffset();
        const localTime = new Date(ahora.getTime() - offset * 60000);

        return {
            unidad: "",
            fecha: localTime.toISOString().slice(0, 16),
            nivelCombustible: "",
            tempInicial: "",
            setPoint: "",
            nivelAnticongelante: ""
        };
    });

    // Obtener las unidades desde el backend
    useEffect(() => {
        const cargarUnidades = async () => {
            try {
                const data = await getUnidades();

                setUnidades(data);
            } catch (error) {
                console.error("Error al obtener las unidades:", error);
            }
        };

        cargarUnidades();
    }, []);

    // Manejar cambios de todos los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Datos del formulario:", formData);
    };

    return (
        <form
            className="main-container"
            onSubmit={handleSubmit}
        >

            {/* Título */}
            <div className="title-container">
                <h2>Crear bitácora</h2>
            </div>


            {/* ==================== */}
            {/* DATOS */}
            {/* ==================== */}

            <h3>Datos</h3>

            <div className="formDate">

                <label htmlFor="unidad">
                    Unidad:
                </label>

                <select
                    id="unidad"
                    name="unidad"
                    value={formData.unidad}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Seleccione una unidad
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

                <br />

                <label htmlFor="fecha">
                    Fecha:
                </label>

                <input
                    type="datetime-local"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                />

            </div>


            {/* ==================== */}
            {/* NIVELES Y TEMPERATURAS */}
            {/* ==================== */}

            <h3>Niveles y temperaturas</h3>

            <div className="datos_iniciales">

                <label htmlFor="tempInicial">
                    Temperatura inicial
                </label>

                <input
                    type="number"
                    id="tempInicial"
                    name="tempInicial"
                    value={formData.tempInicial}
                    onChange={handleChange}
                />

                <br />


                <label htmlFor="setPoint">
                    Set point
                </label>

                <input
                    type="number"
                    id="setPoint"
                    name="setPoint"
                    value={formData.setPoint}
                    onChange={handleChange}
                />

                <br />

                {/*
                <label htmlFor="nivelAceite">
                    Nivel de aceite
                </label>

                <input
                    type="text"
                    id="nivelAceite"
                    name="nivelAceite"
                    value={formData.nivelAceite}
                    onChange={handleChange}
                />

                <br />


                <label htmlFor="nivelAnticongelante">
                    Nivel de anticongelante
                </label>

                <input
                    type="text"
                    id="nivelAnticongelante"
                    name="nivelAnticongelante"
                    value={formData.nivelAnticongelante}
                    onChange={handleChange}
                />

                <br />
                */}

                <label htmlFor="nivelCombustible">
                    Combustible
                </label>

                <select
                    id="nivelCombustible"
                    name="nivelCombustible"
                    value={formData.nivelCombustible}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Nivel 
                    </option>

                    {combustible.map((nivel) => (
                        <option
                            key={nivel}
                            value={nivel}
                        >
                            {nivel}
                        </option>
                    ))}
                </select>
            </div>

            {/* ==================== */}
            {/* OBSERVACIONES */}
            {/* ==================== */}

            <h3>Observaciones</h3>

            <textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                className="obsInput"
                rows="4"
            />


            {/* ==================== */}
            {/* BOTÓN */}
            {/* ==================== */}

            <br />

            <button type="submit">
                Guardar
            </button>

        </form>
    );
};

export default Form;