import aspida from "@aspida/fetch";
import api from "./pages/api/$api";

const apiClient = api(aspida());

export default apiClient;
