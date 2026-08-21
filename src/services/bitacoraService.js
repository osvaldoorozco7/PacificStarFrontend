import api from "./api";

export const saveBitacora = async (data) => {
    const response = await api.post("/Bitacora/saveBitacora", data);
    return response.data;
};