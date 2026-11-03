
import React, { useEffect, useState } from "react";
import "./Unidades.css";
import { getUnidades } from "../../services/unidadService";

const Unidades = () => {

    const [unidades, setUnidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedId, setExpandedId] = useState(null);

    /* =================== */
    /* SEMÁFORO            */
    /* =================== */

    const handleServiceStatus = (horasMotor, ultimoServicio) => {

        if (horasMotor == null || ultimoServicio == null) {
            return {
                backgroundColor: "#eeeeee"
            };
        }

        const horasTrabajadas = horasMotor - ultimoServicio;
        const intervaloServicio = 1000;

        let color;

        if (horasTrabajadas >= intervaloServicio) {
            color = "#fa000046"; // Rojo
        } else if (horasTrabajadas >= intervaloServicio - 20) {
            color = "#f0f02059"; // Amarillo
        } else {
            color = "#20f02059"; // Verde
        }

        return {
            backgroundColor: color
        };
    };

    /* =================== */
    /* ESTADO DE TARJETA   */
    /* =================== */

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
    /* ESTADO DE FILA      */
    /* =================== */

    const handleRowStatus = (unidad) => {
        return handleCardStatus(
            unidad.horasMotor,
            unidad.ultimoServicio,
            unidad.active
        );
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
    /* FORMATEAR FECHA     */
    /* =================== */

    const formatearFecha = (fecha) => {
        if (!fecha) return "-";

        const [date] = fecha.split("T");
        const [year, month, day] = date.split("-");

        return `${day}-${month}-${year}`;
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
    /* CONTENIDO DE ESTADO */
    /* =================== */

    const renderStatus = () => {

        if (loading) {
            return <div className="status-message">Cargando unidades...</div>;
        }

        if (error) {
            return <div className="status-message error">{error}</div>;
        }

        if (unidades.length === 0) {
            return <div className="status-message">No hay unidades</div>;
        }

        return null;
    };

    return (

        <div className="unidades-main-container">

            <div className="unidades-header">
                <h2>Unidades</h2>
            </div>

            {/* ==================== */}
            {/* VERSION MÓVIL        */}
            {/* ==================== */}

            <div className="mobile-list">

                {renderStatus()}

                {!loading && !error && unidades.map((unidad) => {

                    const isExpanded =
                        expandedId === unidad.numeroUnidad;

                    return (

                        <div
                            className={`unidad-card ${isExpanded ? "expanded" : ""}`}
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
                                    toggleDetails(unidad.numeroUnidad)
                                }
                            >

                                <div className="unidad-status-row">
                                    <strong>
                                        {!unidad.active
                                            ? "UNIDAD FUERA DE SERVICIO"
                                            : ""}
                                    </strong>
                                </div>

                                <div className="unidad-row">
                                    <span>Unidad</span>
                                    <strong>{unidad.numeroUnidad}</strong>
                                </div>

                                <div className="unidad-row">
                                    <span>Horas motor</span>
                                    <strong>{unidad.horasMotor ?? "-"}</strong>
                                </div>

                                <div className="unidad-row-arrow">
                                    <img
                                        src={
                                            isExpanded
                                                ? "/up-arrow.svg"
                                                : "/down-arrow.svg"
                                        }
                                        alt="Mostrar detalles"
                                    />
                                </div>

                            </button>

                            {isExpanded && (

                                <div className="unidad-details">

                                    <div className="unidad-row">
                                        <span>Modelo</span>
                                        <strong>{unidad.modelo}</strong>
                                    </div>

                                    <div className="unidad-row">
                                        <span>Fecha de último servicio</span>
                                        <strong>
                                            {formatearFecha(unidad.fechaUltimoServicio)}
                                        </strong>
                                    </div>

                                    <div className="unidad-row">
                                        <span>Horas de último servicio</span>
                                        <strong>
                                            {unidad.ultimoServicio ?? "-"}
                                        </strong>
                                    </div>

                                </div>

                            )}

                            {isExpanded && (
                                <div className="unidades-actions">
                                    <button
                                        type="button"
                                        className="action-edit"
                                    >
                                        Editar
                                    </button>
                                </div>
                            )}

                        </div>
                    );

                })}

            </div>

            {/* ==================== */}
            {/* VERSION DESKTOP      */}
            {/* ==================== */}

            <div className="desktop-table">

                {renderStatus()}

                {!loading && !error && unidades.length > 0 && (

                    <div className="table-container">

                        <table>

                            <thead>
                                <tr>
                                    <th>Unidad</th>
                                    <th>Modelo</th>
                                    <th>Horas motor</th>
                                    <th>Último servicio</th>
                                    <th>Fecha último servicio</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>

                            <tbody>

                                {unidades.map((unidad) => (

                                    <tr
                                        key={unidad.numeroUnidad}
                                        style={handleRowStatus(unidad)}
                                    >

                                        <td>
                                            {unidad.numeroUnidad}
                                        </td>

                                        <td>
                                            {unidad.modelo}
                                        </td>

                                        <td>
                                            {unidad.horasMotor ?? "-"}
                                        </td>

                                        <td>
                                            {unidad.ultimoServicio ?? "-"}
                                        </td>

                                        <td>
                                            {formatearFecha(unidad.fechaUltimoServicio)}
                                        </td>

                                        <td>
                                            <span className={`unidad-estado ${unidad.active ? "activa" : "inactiva"}`}>
                                                {unidad.active
                                                    ? "Activa"
                                                    : "Fuera de servicio"}
                                            </span>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );
};

export default Unidades;
