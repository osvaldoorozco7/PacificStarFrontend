import { useEffect, useState } from "react";
import { getBitacoras } from "../../services/bitacoraService";

const Bitacoras = () => {


    const [bitacoras, setBitacoras] = useState([]);
    const formatearFecha = (fecha) => {
        if (!fecha) return "";
        
        const [date] = fecha.split("T");
        const [year, month, day] = date.split("-");
        
        return `${day}-${month}-${year}`;
    };

    const formatearHora = (fecha) => {
        if (!fecha) return "";

        const time = fecha.split("T")[1];

        return time.substring(0, 5);
    };

    useEffect(() => {

        console.log("useEffect ejecutado");

        const cargarBitacoras = async () => {

            try {
                const data = await getBitacoras();

                console.log("Bitácoras recibidas:", data);

                setBitacoras(data);

            } catch (error) {
                console.error("Error al obtener las bitácoras:", error);
            }
        };

        cargarBitacoras();

    }, []);

    return (
        <div>
            <h1>Bitácoras</h1>

            <table>
                <thead>
                    <tr>
                        <th>Unidad</th>
                        <th>Fecha</th>
                        <th>Hora encendido</th>
                        <th>Combustible</th>
                        <th>Temp. Inicial</th>
                        <th>Temp. Final</th>
                    </tr>
                </thead>

                <tbody>
                    {bitacoras.map((bitacora) => (
                        <tr>
                            <td>{bitacora.numeroUnidad}</td>
                            <td>{formatearFecha(bitacora.fecha)}</td>
                            <td>{formatearHora(bitacora.horaEncendido)}</td>
                            <td>{bitacora.nivelCombustible}</td>
                            <td>{bitacora.tempInicial}</td>
                            <td>{bitacora.tempFinal}</td>
                        </tr>
                     ))}
                </tbody>
            </table>


        </div>
    );
};

export default Bitacoras;