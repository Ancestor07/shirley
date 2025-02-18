import ErrorService from "../services/Error.service";
import {HttpService} from "../services/Http.service";

export default class BaseActions {
    get errorService(): ErrorService {
        return this._errorService
    }

    get httpService(): HttpService {
        return this._httpService
    }

    private _httpService: HttpService = new HttpService()
    private _errorService: ErrorService = new ErrorService()
}