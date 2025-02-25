import axios, {AxiosError} from "axios";

export default class ErrorService {

    private handleSnackbar(message: string) {
        console.log(message)
    }

    public fetchApiError(error: AxiosError<any>) {
        let message

        if (axios.isAxiosError(error) && error.response) {
            message = error?.response?.data?.detail
                ? error.response.data?.detail
                : "Terjadi Kesalahan Pada Sistem"
        } else message = String(error)
        this.handleSnackbar(message)
        return message

    }

    public swallApiError(error?: Error) {
        let message
        if (axios.isAxiosError(error) && error.response) {
            message = error.response.data.message ?? "Terjadi Kesalahan Pada Sistem"
        } else message = String(error)
        this.handleSnackbar(message)
        return message
    }
}