import axios from "axios";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] ='application/json';
const api = axios.create({ baseURL: "http://localhost:8081/api" });

export default api;