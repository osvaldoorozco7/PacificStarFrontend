import React, { useEffect, useState } from "react";
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

    const handleServiceStatus = (horasMotor, ultimoServicio) => {
        let color;
        var result = horasMotor - ultimoServicio;

        if (result == null) {
            color = "#eeeeee";
        } else if (result < 900) {
            color = "#20f02059";
        } else if (result > 980 && result < 1000) {
            color = "#f0f02059";
        } else {
            color = "#fa000046";
        }

        return {
            backgroundColor: color
        };
    };

    const handleCardStatus = (horasMotor, ultimoServicio, active) => {
        if (!active) {
            return {
                backgroundColor: "#80808050",
                color: "white"
            };
        }

        return handleServiceStatus(horasMotor, ultimoServicio);
    };

    /* =================== */
    /* EXPANDIR TARJETA    */
    /* =================== */

    const toggleDetails = (id) => {
        setExpandedId(
            expandedId === id ? null : id
        );
    };

    /* =================== */
    /* CARGAR UNIDADES     */
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
                console.error(
                    "No se pudieron obtener las unidades",
                    error
                );

                setError("Error al cargar las unidades");

            } finally {
                setLoading(false);
            }
        };

        cargarUnidades();
    }, []);

    /* =================== */
    /* RENDER              */
    /* =================== */

    return (
        <div className="unidades-main-container">

            <div className="unidades-header">
                <h2>Unidades</h2>
            </div>

            {/* ==================== */}
            {/* VERSION MÓVIL        */}
            {/* ==================== */}

            <div className="mobile-list">

                {loading ? (

                    <div className="status-message">
                        Cargando unidades...
                    </div>

                ) : error ? (

                    <div className="status-message error">
                        {error}
                    </div>

                ) : unidades.length === 0 ? (

                    <div className="status-message">
                        No hay unidades
                    </div>

                ) : (

                    unidades.map((unidad) => {

                        const isExpanded =
                            expandedId === unidad.numeroUnidad;

                        return (
                            <div
                                className={`unidad-card ${
                                    isExpanded ? "expanded" : ""
                                }`}
                                key={unidad.numeroUnidad}
                                 style={handleCardStatus(
                                    unidad.horasMotor,
                                    unidad.ultimoServicio,
                                    unidad.active 
                                )}
                            >

                                <button
                                    type="button"
                                    className="unidad-summary"
                                    onClick={() =>
                                        toggleDetails(
                                            unidad.numeroUnidad
                                        )
                                    }
                                >

                                    <div className="unidad-status-row">
                                        <strong>
                                            {unidad.active
                                                ? ""
                                                : "UNIDAD FUERA DE SERVICIO"}
                                        </strong>
                                    </div>

                                    <div className="unidad-row">
                                        <span>Unidad</span>
                                        
                                        <strong>
                                            {unidad.numeroUnidad}
                                        </strong>
                                    </div>

                                    <div className="unidad-row">
                                        <span>Horas motor</span>

                                        <strong>
                                            {unidad.horasMotor ?? "-"}
                                        </strong>
                                    </div>

                                    <div className="unidad-row-arrow">
                                        
                                        <img
                                            src={isExpanded ?"/up-arrow.svg" :"/down-arrow.svg" }
                                            alt="Mostrar detalles"
                                        />
                                    </div>

                                </button>

                                {isExpanded && (
                                    <>
                                    <div className="unidad-details">
                                        <div className="unidad-row">
                                            <span>Modelo</span>
                                            <strong>{unidad.modelo}</strong>
                                        </div>

                                        <div className="unidad-row">
                                            <span>Fecha de último servicio</span>
                                            <strong>-</strong>
                                        </div>

                                        <div className="unidad-row">
                                            <span>Horas de último servicio</span>
                                            <strong>{unidad.ultimoServicio}</strong>
                                        </div>
                                    </div>

                                    <div className="unidades-actions">
                                        <button className="action-edit">
                                            Editar
                                        </button>
                                    </div>
                                    </>

                                )}

                            </div>
                        );
                    })
                )}

            </div>

        </div>
    );
};

export default Unidades;