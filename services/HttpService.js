import axios from 'axios';
import getConfig from 'next/config';
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const {publicRuntimeConfig} = getConfig();

// TODO handle errors better, check for null response, check for null data, etc.

class HttpService {
    static get(resourceName, queryParams=[], baseURL=(this.basePath)) {
        axios.defaults.baseURL = baseURL;
        axios.defaults.responseType = "application/json";
        // axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

        return axios.get(`${resourceName}${this.buildQuery(queryParams)}`)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                if(err.response) {
                    let status = err.response.status;
                    if(status === 401) {
                        //TODO
                        console.log("Unuauthorized");
                    }
                }
            });
    }

    static post(resourceName, object, queryParams=[]) {
        axios.defaults.baseURL = this.basePath;
        axios.defaults.responseType = "application/json";
        // axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        return axios.post(`${resourceName}${this.buildQuery(queryParams)}`, object)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                if(err.response) {
                    let status = err.response.status;
                    if(status === 401) {
                        //TODO
                        console.log("Unuauthorized");
                    }
                }
            });
    }

    static put(resourceName, object, queryParams=[]) {
        axios.defaults.baseURL = this.basePath;        
        // axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
        axios.defaults.headers.put['Content-Type'] = 'application/json';
        axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';

        return axios.put(`${resourceName}${this.buildQuery(queryParams)}`, object, {withCredentials: true})
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                if(err.response) {
                    let status = err.response.status;
                    if(status === 401) {
                        //TODO
                        console.log("Unuauthorized");
                    }
                }
            });
    }

    static delete(resourceName, id) {
        axios.defaults.baseURL = this.basePath;
        axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';

        return axios.delete(`${resourceName}/${id}/delete`, {withCredentials: true})
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                if(err.response) {
                    let status = err.response.status;
                    if(status === 401) {
                        //TODO
                        console.log("Unuauthorized");
                    }
                }
            });
    }

    static buildQuery(queryParams) {
        if (queryParams && queryParams.length > 0) {
            let result = "?";
            for(let i in queryParams) {
                let p = queryParams[i];
                if(i > 0) result = result + "&";
                result = result + `${p.name}=${p.value}`
            }

            return result;
        } else return ""

    }

    static get basePath() {
        return `${publicRuntimeConfig.api}/api`;
    }

    static get corePath() {
        return publicRuntimeConfig.coreApi;
    }

    // static get accessToken() {
    //     return localStorage.getItem('token');
    // }
}

export default HttpService;