import React, { use, useEffect, useState } from "react";
import "./Unidades.css";
import { useNavigate } from "react-router-dom";
import { getUnidades } from "../../services/unidadService";

const Unidades = () => {
    const navigate = useNavigate();
    const [unidades, setUnidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedId, setExpandedId] = useState(null);

    /* =================== */
    /* SEMÁFORO */
    /* =================== */
    const handleStatus = (status) => {
        const color = status === true ? "green" : "red";
        

        return {
            backgroundColor: color
        };
    };

    /* =================== */
    /* Cargar unidades     */
    /* =================== */

    useEffect(() => {

        const cargarUnidades = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getUnidades();
                console.log("Unidades recibidas", data);
                setUnidades(data);

            } catch (error) {

                console.log("No se pudieron obtener las unidades", error);

                setError("Error al cargar las unidades");

            } finally {

                setLoading(false);

            }
        };

        cargarUnidades();
    }, []);

    return (
        <div className="unidades-main-container">

            <div className="unidades-header">

                <h2>Unidades</h2>

            </div>

            {/* ==================== */}
            {/* VERSION MÓVIL        */}
            {/* ==================== */}

            <div className="mobile-list">
                {unidades.length === 0 ? (
                    <div className="status-message">
                        No hay unidades
                    </div>
                ) : (
                    unidades.map((unidad) => (
                        <div className="unidad-card" key={unidad.numeroUnidad}>

                            <div className="unidad-row">
                                <span>Unidad</span>
                                <strong>{unidad.numeroUnidad}</strong>
                            </div>

                            <div className="unidad-row" >
                                <span>Horas del motor</span>
                                <strong>{unidad.horasMotor ?? "-"}</strong>
                            </div>

                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default Unidades;