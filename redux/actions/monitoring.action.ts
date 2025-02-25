import {MonitoringSlice} from "../reducers/monitoring.slice";
import {Dispatch} from "redux";
import {HttpService} from "../../services/Http.service";
import {ENDPOINT_CONSTANT} from "../../constants/Endpoint.constant";
import {IBaseResponse} from "../../models/IBaseResponse";
import {IListData} from "../../models/responses/IListData";
import {IListDateAvg} from "../../models/responses/IListDateAvg";
import {IDetailDate} from "../../models/responses/IDetailDate";
import ErrorService from "../../services/Error.service";
import {isRejectedWithValue} from "@reduxjs/toolkit";

export class MonitoringAction {
    private monitoring = MonitoringSlice.actions
    private url = ENDPOINT_CONSTANT.DATA
    private service = new HttpService()
    private errorService = new ErrorService()

    public getListData = () => {
        return async (dispatch: Dispatch) => {
            dispatch(this.monitoring.setLoading(true))
            await this.service
                .GET(this.url.LIST_DATA)
                .then((res: IBaseResponse<IListData[]>) => {
                    dispatch(this.monitoring.setListData({data: res.data, loading: false}))
                    dispatch(this.monitoring.setLoading(false))
                }).catch((e) => {
                    dispatch(this.monitoring.setLoading(false))
                    dispatch(this.monitoring.setError(e))
                })

        }
    }

    public getListDateAvg = () => {
        return async (dispatch: Dispatch) => {
            dispatch(this.monitoring.setLoading(true))
            await this.service
                .GET(this.url.LIST_DATE_AVG)
                .then((res: IBaseResponse<IListDateAvg[]>) => {
                    dispatch(this.monitoring.setListDateAvg({data: res.data.data, loading: false}))
                    dispatch(this.monitoring.setLoading(false))
                }).catch((e) => {
                    dispatch(this.monitoring.setLoading(false))
                    const error = this.errorService.fetchApiError(e)
                    return isRejectedWithValue(error)
                })

        }
    }

    public getDetailDate = (date: string) => {
        return async (dispatch: Dispatch) => {
            dispatch(this.monitoring.setLoading(true))
            await this.service
                .GET(this.url.DETAIL_DATE + date)
                .then((res: IBaseResponse<IDetailDate>) => {
                    dispatch(this.monitoring.setListData({data: res.data, loading: false}))
                    dispatch(this.monitoring.setLoading(false))
                }).catch((e) => {
                    dispatch(this.monitoring.setLoading(false))
                    dispatch(this.monitoring.setError(e))
                })

        }
    }
}