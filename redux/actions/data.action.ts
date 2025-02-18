import {DataSlice} from "../reducers/data.slice";
import {Dispatch} from "redux";
import {HttpService} from "../../services/Http.service";
import {ENDPOINT_CONSTANT} from "../../constants/Endpoint.constant";
import {IBaseResponse} from "../../models/IBaseResponse";
import {IListData} from "../../models/responses/IListData";
import {IListDateAvg} from "../../models/responses/IListDateAvg";
import {IDetailDate} from "../../models/responses/IDetailDate";

export class DataAction {
    private data = DataSlice.actions
    private url = ENDPOINT_CONSTANT.DATA
    private service = new HttpService()

    public getListData = () => {
        return async (dispatch: Dispatch) => {
            dispatch(this.data.setLoading(true))
            await this.service
                .GET(this.url.LIST_DATA)
                .then((res: IBaseResponse<IListData[]>) => {
                    dispatch(this.data.setListData({data: res.data, loading: false}))
                    dispatch(this.data.setLoading(false))
                }).catch((e) => {
                    dispatch(this.data.setLoading(false))
                    dispatch(this.data.setError(e))
                })

        }
    }

    public getListDateAvg = () => {
        return async (dispatch: Dispatch) => {
            dispatch(this.data.setLoading(true))
            await this.service
                .GET(this.url.LIST_DATE_AVG)
                .then((res: IBaseResponse<IListDateAvg[]>) => {
                    dispatch(this.data.setListData({data: res.data, loading: false}))
                    dispatch(this.data.setLoading(false))
                }).catch((e) => {
                    dispatch(this.data.setLoading(false))
                    dispatch(this.data.setError(e))
                })

        }
    }

    public getDetailDate = (date: string) => {
        return async (dispatch: Dispatch) => {
            dispatch(this.data.setLoading(true))
            await this.service
                .GET(this.url.DETAIL_DATE + date)
                .then((res: IBaseResponse<IDetailDate>) => {
                    dispatch(this.data.setListData({data: res.data, loading: false}))
                    dispatch(this.data.setLoading(false))
                }).catch((e) => {
                    dispatch(this.data.setLoading(false))
                    dispatch(this.data.setError(e))
                })

        }
    }
}