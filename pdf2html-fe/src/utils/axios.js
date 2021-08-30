import axios from "axios";
import qs from "qs";

const instance = axios.create();
// instance.defaults.baseURL = "/";
// instance.defaults.headers["Content-Type"] = "multipart/form-data";
instance.defaults.transformRequest = (data, headers) => {
    const contentType = headers["Content-Type"];
    if (contentType === "application/x-www-form-urlencoded")
        return qs.stringify(data);
    return data;
};
instance.interceptors.response.use(response => {
    return response.data;
});

export default instance;
