import api from "./api";

export const getUnidades = async () => {
    const response = await api.get("/unidad")
    return response.data;
};

export const saveServicio = async (id, horasServicio, fechaServicio) => {
    const body = {
        numeroUnidad: id,
        horasServicio: horasServicio,
        fechaServicio: fechaServicio
    };

    const response = await api.post(`unidad/${id}/servicio`, body);

    return response.data;
};