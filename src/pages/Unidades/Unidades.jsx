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
    /* SEMÁFORO            */
    /* =================== */
const handleServiceStatus = (horasMotor) => {
    let color;

    if (horasMotor == null) {
        color = "#eeeeee"; 
    } else if (horasMotor < 100) {
        color = "#20f02059";
    } else if (horasMotor < 200) {
        color = "#f0f02059";
    } else {
        color = "#fa000046";
    }

    return {
        backgroundColor: color
    };
};

const handleCardStatus = (horasMotor, active) => {
    if (!active) {
        return {
            backgroundColor: "#80808050",
            color: "white"
        };
    }

    return handleServiceStatus(horasMotor);
};

    /* =================== */
    /* EXPANDIR TARJETA    */
    /* =================== */

    const toggleDetails = (id) => {

        setExpandedId(expandedId === id ? null : id);

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
                        Cargando unidades
                    </div>
                ) : (
                    unidades.map((unidad) => {

                        const isExpanded = expandedId === unidad.numeroUnidad;

                        return(
                            <div className="unidad-card" key={unidad.numeroUnidad} style={handleCardStatus(unidad.horasMotor, unidad.active)}>
                                
                                <button
                                    type="button"
                                    className="unidad-summary"
                                    onClick={() => toggleDetails(unidad.numeroUnidad)}>
                                    <div className="unidad-status-row">
                                        <strong>
                                            {unidad.active === true ? null : "FUERA DE SERVICIO"}
                                        </strong>
                                    </div>

                                    <div className="unidad-row" >
                                        <span>Unidad</span>
                                        <span>Horas motor</span>
                                    </div>

                                    <div className="unidad-row">
                                        <strong>{unidad.numeroUnidad}</strong>
                                        <strong>{unidad.horasMotor ?? "-"}</strong>
                                    </div>

                                    <div className="unidad-row-arrow">
                                        <img src="/down-arrow.svg" alt="" />
                                    </div>
                                </button>

                                {isExpanded && (
                                    <>
                                    <div className="unidad-details">
                                        Hola
                                    </div>
                                    </>
                                )

                                }
                            </div>
                        );
                    })
                )}

            </div>

        </div>
    );
};

export default Unidades;