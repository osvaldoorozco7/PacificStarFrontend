import { useEffect, useState } from "react";
import "./Form.css";
import { getUnidades } from "../../services/unidadService";
import { saveBitacora } from "../../services/bitacoraService";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const navigate = useNavigate();
    const [unidades, setUnidades] = useState([]);
    const combustible = [
    { label: "Empty", value: 0 },
    { label: "1/8", value: 0.125 },
    { label: "1/4", value: 0.25 },
    { label: "3/8", value: 0.375 },
    { label: "1/2", value: 0.5 },
    { label: "5/8", value: 0.625 },
    { label: "3/4", value: 0.75 },
    { label: "7/8", value: 0.875 },
    { label: "Full", value: 1 }
    ];
    const estado = ["Bueno", "Malo"];

    const [formData, setFormData] = useState(() => {
        const ahora = new Date();
        const offset = ahora.getTimezoneOffset();
        const localTime = new Date(ahora.getTime() - offset * 60000);

        return {
                unidad: "",
                horasMotor: "",
                fecha: "",
                horaEncendido: "",
                nivelCombustible: "",
                tempInicial: "",
                tempFinal: ""
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        const request = {
            numeroUnidad: Number(formData.unidad),

            horasMotor: Number(formData.horasMotor),

            fecha: `${formData.fecha}T00:00:00`,

            horaEncendido: `${formData.fecha}T${formData.horaEncendido}:00`,

            nivelCombustible: Number(formData.nivelCombustible),

            tempInicial: Number(formData.tempInicial),

            tempFinal: Number(formData.tempFinal)
        };

        console.log("Enviando:", request);

        try {
            const response = await saveBitacora(request);
            navigate("/");
        } catch (error) {
            console.error("Error al guardar:", error);
        }
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
                <label htmlFor="horasMotor">
                    Horas del motor
                </label>

                <input 
                type="number" 
                id="horasMotor"
                name="horasMotor"
                value={formData.horasMotor}
                onChange={handleChange}
                required/>

                <br />

                <label htmlFor="fecha">
                    Fecha
                </label>

                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="horaEncendido">
                    Hora de encendido
                </label>

                <input
                    type="time"
                    id="horaEncendido"
                    name="horaEncendido"
                    value={formData.horaEncendido}
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
                    min="-30"
                    max="50"
                    step="0.1"
                    id="setPoint"
                    name="setPoint"
                    value={formData.tempFinal}
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
                            key={nivel.value}
                            value={nivel.value}
                        >
                            {nivel.label}
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
