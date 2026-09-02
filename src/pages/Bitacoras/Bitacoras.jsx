import { useEffect, useState } from "react";
import { delBitacora, getBitacoras } from "../../services/bitacoraService";
import "./Bitacoras.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Bitacoras = () => {
    const navigate = useNavigate();
    const [bitacoras, setBitacoras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedId, setExpandedId] = useState(null);


    // =========================
    // FORMATEAR FECHA
    // =========================

    const formatearFecha = (fecha) => {

        if (!fecha) return "-";

        const [date] = fecha.split("T");
        const [year, month, day] = date.split("-");

        return `${day}-${month}-${year}`;
    };


    // =========================
    // FORMATEAR HORA
    // =========================

    const formatearHora = (fecha) => {

        if (!fecha || fecha.startsWith("0001-01-01")) {
            return "-";
        }

        const time = fecha.split("T")[1];

        return time ? time.substring(0, 5) : "-";
    };


    // =========================
    // FORMATEAR COMBUSTIBLE
    // =========================

    const formatearCombustible = (nivel) => {

        const niveles = {
            0: "Empty",
            0.125: "1/8",
            0.25: "1/4",
            0.375: "3/8",
            0.5: "1/2",
            0.625: "5/8",
            0.75: "3/4",
            0.875: "7/8",
            1: "Full"
        };

        return niveles[nivel] ?? "-";
    };


    // =========================
    // CARGAR BITÁCORAS
    // =========================

    useEffect(() => {

        const cargarBitacoras = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getBitacoras();

                console.log("Bitácoras recibidas:", data);

                setBitacoras(data);

            } catch (error) {

                console.error(
                    "Error al obtener las bitácoras:",
                    error
                );

                setError(
                    "No se pudieron obtener las bitácoras."
                );

            } finally {

                setLoading(false);

            }
        };

        cargarBitacoras();

    }, []);

    // =========================
    // ELIMINAR BITACORA
    // =========================

    const eliminarBitacora = async (id) => {
        try {
            const eliminar = await delBitacora(id);
            navigate("/");
        } catch (error) {
            console.error( "No se pudo eliminar bitácora.", error);
        }
    };


    // =========================
    // EXPANDIR TARJETA
    // =========================

    const toggleDetails = (id) => {

        setExpandedId(
            expandedId === id ? null : id
        );

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="bitacoras-container">

                <h1>Bitácoras</h1>

                <div className="status-message">
                    Cargando bitácoras...
                </div>

            </div>
        );
    }


    // =========================
    // ERROR
    // =========================

    if (error) {

        return (
            <div className="bitacoras-container">

                <h1>Bitácoras</h1>

                <div className="status-message error">
                    {error}
                </div>

            </div>
        );
    }


    return (

        <div className="bitacoras-container">

            <div className="bitacoras-header">

                <h1>Bitácoras</h1>

                <span className="bitacoras-count">
                    {bitacoras.length} registros
                </span>

            </div>


            {/* ================================= */}
            {/* VERSIÓN ESCRITORIO */}
            {/* ================================= */}

            <div className="desktop-table">

                {bitacoras.length === 0 ? (

                    <div className="status-message">
                        No hay bitácoras registradas.
                    </div>

                ) : (

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>
                                    <th>Unidad</th>
                                    <th>Fecha</th>
                                    <th>Hora encendido</th>
                                    <th>Combustible</th>
                                    <th>Temp. inicial</th>
                                    <th>Temp. final</th>
                                </tr>

                            </thead>


                            <tbody>

                                {bitacoras.map((bitacora) => (

                                    <tr key={bitacora.id}>

                                        <td>
                                            {bitacora.numeroUnidad}
                                        </td>

                                        <td>
                                            {formatearFecha(
                                                bitacora.fecha
                                            )}
                                        </td>

                                        <td>
                                            {formatearHora(
                                                bitacora.horaEncendido
                                            )}
                                        </td>

                                        <td>
                                            {formatearCombustible(
                                                bitacora.nivelCombustible
                                            )}
                                        </td>

                                        <td>
                                            {bitacora.tempInicial} °C
                                        </td>

                                        <td>
                                            {bitacora.tempFinal} °C
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* ================================= */}
            {/* VERSIÓN MÓVIL */}
            {/* ================================= */}

            <div className="mobile-list">

                {bitacoras.length === 0 ? (

                    <div className="status-message">
                        No hay bitácoras registradas.
                    </div>

                ) : (

                    bitacoras.map((bitacora) => {

                        const isExpanded =
                            expandedId === bitacora.id;

                        return (

                            <div
                                className={`bitacora-card ${
                                    isExpanded
                                        ? "expanded"
                                        : ""
                                }`}
                                key={bitacora.id}
                            >

                                {/* ================= */}
                                {/* RESUMEN */}
                                {/* ================= */}

                                <button
                                    type="button"
                                    className="bitacora-summary"
                                    onClick={() =>
                                        toggleDetails(
                                            bitacora.id
                                        )
                                    }
                                >

                                    <div className="summary-main">

                                        <span className="unidad">
                                            Unidad{" "}
                                            {bitacora.numeroUnidad}
                                        </span>

                                        <span className="fecha-hora">
                                            {formatearFecha(
                                                bitacora.fecha
                                            )}

                                            {" · "}

                                            {formatearHora(
                                                bitacora.horaEncendido
                                            )}
                                        </span>

                                        <span className="temperaturas">
                                            {bitacora.tempInicial}
                                            {" °C"}
                                            {" → "}
                                            {bitacora.tempFinal}
                                            {" °C"}
                                        </span>

                                    </div>


                                    <span className="arrow">
                                        {isExpanded
                                            ? "⌃"
                                            : "›"}
                                    </span>

                                </button>


                                {/* ================= */}
                                {/* DETALLES */}
                                {/* ================= */}

                                {isExpanded && (
                                    <>
                                    <div className="bitacora-details">

                                        <div className="detail-row">

                                            <span>
                                                Fecha
                                            </span>

                                            <strong>
                                                {formatearFecha(
                                                    bitacora.fecha
                                                )}
                                            </strong>

                                        </div>

                                        <div className="detail-row">
                                            <span>Número de bitácora</span>

                                            <strong>
                                                {bitacora.id}
                                            </strong>
                                        </div>


                                        <div className="detail-row">

                                            <span>
                                                Hora de encendido
                                            </span>

                                            <strong>
                                                {formatearHora(
                                                    bitacora.horaEncendido
                                                )}
                                            </strong>

                                        </div>


                                        <div className="detail-row">

                                            <span>
                                                Combustible
                                            </span>

                                            <strong>
                                                {formatearCombustible(
                                                    bitacora.nivelCombustible
                                                )}
                                            </strong>

                                        </div>


                                        <div className="detail-row">

                                            <span>
                                                Temperatura inicial
                                            </span>

                                            <strong>
                                                {bitacora.tempInicial}
                                                {" °C"}
                                            </strong>

                                        </div>


                                        <div className="detail-row">

                                            <span>
                                                Temperatura final
                                            </span>

                                            <strong>
                                                {bitacora.tempFinal}
                                                {" °C"}
                                            </strong>

                                        </div>


                                        <div className="detail-row">

                                            <span>
                                                Horas del motor
                                            </span>

                                            <strong>
                                                {bitacora.horasMotor ?? "-"}
                                            </strong>

                                        </div>

                                    </div>

                                    <div className="bitacora-actions">
                                        <button className="action-edit">Editar</button>
                                        <button className="action-delete" onClick={() => eliminarBitacora(bitacora.id)}>Eliminar</button>
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

export default Bitacoras;