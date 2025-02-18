import axios, { AxiosRequestConfig } from "axios"

export const RootEndpoint = process.env.ENDPOINT

export class HttpService {
    private baseEndpoint = RootEndpoint
    // private token: string | null = localStorage.getItem("token")

    // private HeaderSetting(): AxiosRequestConfig {
    //     return {
    //         headers: { Authorization: `Bearer ${this.token}` }
    //     }
    // }

    public GET(url: string) {
        return axios.get(this.baseEndpoint + url)
    }

    public POST_LOGIN<T>(URL: string, data: T) {
        return axios.post(this.baseEndpoint + URL, data)
    }
    public POST<T>(URL: string, data: T) {
        return axios.post(this.baseEndpoint + URL, data)
    }

    public PUT<T>(URL: string, data: T) {
        return axios.put(this.baseEndpoint + URL, data)
    }

    public PATCH(URL: string) {
        return axios.patch(this.baseEndpoint + URL, undefined)
    }

    public DELETE(URL: string) {
        return axios.delete(this.baseEndpoint + URL)
    }
}