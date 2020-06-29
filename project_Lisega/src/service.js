import cookieHandler from "@/cookie";
import axios from 'axios';

const API_URL = 'http://ec2-3-122-226-224.eu-central-1.compute.amazonaws.com';

class Service{

    constructor(){}

    async login(credentials) {
        return axios({
            method: 'post',
            url: `${API_URL}/login`,
            data: credentials,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.data)
        .then(result => {
            cookieHandler.setToken(result.accesstoken)
            return result
        })
    }
    
    async logout() {
        return axios({
            method: 'post',
            url: `${API_URL}/logout`,
            withCredentials: true
        }).then(response => response.data)
        .then(() => {
            cookieHandler.removeToken()
        })
    }

    async register(credentials) {
        return axios({
            method: 'post',
            url: `${API_URL}/register`,
            data: credentials,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.data)
    }

    async fetchDocs(currentPage) {
        await this.refreshToken()
        return axios({
            method: 'get',
            url: `${API_URL}/get_docs/${currentPage}`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${cookieHandler.getToken()}`,
            }
        }).then(response => response.data)
    }

    async submitForm(formName, form, method) {
        await this.refreshToken()
        return axios({
            method: method,
            url: `${API_URL}/${formName}`,
            data: form,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${cookieHandler.getToken()}`,
            }
        }).then(response => response.data)
    }

    async generateForm(id) {
        await this.refreshToken()
        return axios({
            method: 'post',
            url: `${API_URL}/generate/${id}`,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${cookieHandler.getToken()}`,
            }
        }).then(response => response.data)
    }

    async downloadForm(id) {
        await this.refreshToken()
        return axios({
            method: 'get',
            url: `${API_URL}/download/${id}`,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${cookieHandler.getToken()}`,
            },
            responseType: 'blob'
        })
    }

    async refreshToken() {
        if (!cookieHandler.isAccessTokenExpired()) {
            return 
        }

        return axios({
            method: 'post',
            url: `${API_URL}/refresh_token`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.data)
        .then(result => {
            cookieHandler.setToken(result.accesstoken)
        })
    }

    async fetchForm(id) {
        await this.refreshToken()
        return axios({
            method: 'get',
            url: `${API_URL}/form/${id}`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${cookieHandler.getToken()}`,
            }
        }).then(response => response.data)
    }

    async fetchForm2(id) {
        await this.refreshToken()
        return axios({
            method: 'get',
            url: `${API_URL}/form2/${id}`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${cookieHandler.getToken()}`,
            }
        }).then(response => response.data)
    }

    async deleteDoc(id) {
        await this.refreshToken()
        return axios({
            method: 'delete',
            url: `${API_URL}/doc/${id}`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${cookieHandler.getToken()}`,
            }
        }).then(response => response.data)
    }
}

export default new Service()