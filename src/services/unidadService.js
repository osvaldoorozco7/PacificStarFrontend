import api from "./api";

export const getUnidades = async () => {
    const response = await api.get("/unidad")
    return response.data;
};