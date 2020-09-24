import axios from "axios";

const api = axios.create({
    baseURL: "https://product-backend-tryout.herokuapp.com/"
});

export default api;