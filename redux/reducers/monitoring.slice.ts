import {createSlice} from "@reduxjs/toolkit";
import {IBasePayloadAction, IRootResponse} from "../../models/IBaseResponse";
import {IListData} from "../../models/responses/IListData";
import {IListDateAvg} from "../../models/responses/IListDateAvg";
import {IDetailDate} from "../../models/responses/IDetailDate";

const initState: IDataReducer = {
    loading : false,
    error: undefined,
    errorMessage: undefined,
    errorCode: undefined,
    listData: undefined,
    listDateAvg: undefined,
    detailDate: undefined
}

export const MonitoringSlice = createSlice({
    name: "monitoring",
    initialState: initState,
    reducers: {
        setLoading: (state: IDataReducer, action) => {
            state.loading = action.payload
        },
        setError: (state: IDataReducer, action) => {
            state.error = true
            state.errorCode = action.payload.status
            state.errorMessage = action.payload.data
        },
        setListData: (
            state: IDataReducer,
            action: IBasePayloadAction<IRootResponse<IListData[]>>
        ) => {
            state.listData = action.payload.data
        },
        setListDateAvg: (
            state: IDataReducer,
            action: IBasePayloadAction<IListDateAvg>
        ) => {
            state.listDateAvg = action.payload
        },
        setDetailDate: (
            state: IDataReducer,
            action: IBasePayloadAction<IRootResponse<IDetailDate>>
        ) => {
            state.detailDate = action.payload.data
        }
    }
})

export interface IDataReducer {
    loading?: boolean
    error?: any
    errorMessage?: string
    errorCode?: number
    listData?: IRootResponse<IListData[]>
    listDateAvg?: IRootResponse<IListDateAvg>
    detailDate?: IRootResponse<IDetailDate>
}