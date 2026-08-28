import axios from "axios";

const api = axios.create({
    //baseURL: "https://localhost:7174/api",
    baseURL: "https://pacificstar-backend.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    },
});

export default api;