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
    const [isDisabled, setIsDisabled] = useState(false);

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

        if (name === "tempFinal") {
               if(/^-?\d\*$/.test(value)) {
                setFormData((prev) =>({
                    ...prev,
                    [name]: value
                }));
                return;
               }
        }
        
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isDisabled) return;

        setIsDisabled(true);

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

            <div className="formData">

                <div className="form-field">
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
                    <label htmlFor="horasMotor">
                        Horas del motor:
                    </label>

                    <input
                        type="number"
                        id="horasMotor"
                        name="horasMotor"
                        value={formData.horasMotor}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="fecha">
                        Fecha:
                    </label>

                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="horaEncendido">
                        Hora de encendido:
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

            </div>


            {/* ==================== */}
            {/* NIVELES Y TEMPERATURAS */}
            {/* ==================== */}

            <h3>Niveles y temperaturas</h3>
            <div className="datos_iniciales">

                <div className="form-field">
                    <label htmlFor="tempInicial">
                        Temperatura inicial
                    </label>

                    <input
                        type="number"
                        id="tempInicial"
                        name="tempInicial"
                        value={formData.tempInicial}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="tempFinal">
                        Set point
                    </label>

                    <input
                        type="text"
                        id="tempFinal"
                        name="tempFinal"
                        value={formData.tempFinal}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="form-field">
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
                                key={nivel.value}
                                value={nivel.value}
                            >
                                {nivel.label}
                            </option>
                        ))}
                    </select>
                </div>

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

            <button type="submit" disabled={isDisabled}>
                {isDisabled ? "Guardando..." : "Guardar"}
            </button>

        </form>
    );
};

export default Form;
