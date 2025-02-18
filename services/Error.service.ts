import axios, {AxiosError} from "axios";
import { Toast } from "toastify-react-native";

export default class ErrorService {

    private handleSnackbar(message: string) {
        Toast.error(message)
    }

    public fetchApiError(error: AxiosError<any>) {
        let message

        if (axios.isAxiosError(error) && error.response) {
            message = error?.response?.data?.detail
                ? error.response.data?.detail
                : "Terjadi Kesalahan Pada Sistem"
        } else message = String(error)
        return this.handleSnackbar(message)

    }

    public swallApiError(error?: Error) {
        let message
        if (axios.isAxiosError(error) && error.response) {
            message = error.response.data.message ?? "Terjadi Kesalahan Pada Sistem"
        } else message = String(error)
        this.handleSnackbar(message)
    }
}