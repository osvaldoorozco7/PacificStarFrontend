import api from "./api";

export const saveBitacora = async (data) => {
    const response = await api.post("/Bitacora/saveBitacora", data);
    return response.data;
};

export const getBitacoras = async () => {
    const response = await api.get("/Bitacora");
    console.log(response);
    return response.data;
};