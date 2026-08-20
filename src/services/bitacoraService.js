import api from "./api.js";

export const postBitacora = async () => {
    const response = await api.post("/bitacora")
    return response.data;
};