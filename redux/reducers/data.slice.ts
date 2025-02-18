import {createSlice} from "@reduxjs/toolkit";
import {Toast} from "toastify-react-native";
import {IRootResponse} from "../../models/IBaseResponse";
import {IListData} from "../../models/responses/IListData";

const initState: IDataSlice = {
    loading : false,
    error: undefined,
    errorMessage: undefined,
    errorCode: undefined
}

export const DataSlice = createSlice({
    name: "data",
    initialState: initState,
    reducers: {
        setLoading: (state: IDataSlice, action) => {
            state.loading = action.payload
        },
        setError: (state: IDataSlice, action) => {
            state.error = true
            state.errorCode = action.payload.status
            state.errorMessage = action.payload.data
            Toast.error(action.payload.data)
        }
    }
})

export interface IDataSlice {
    loading?: boolean
    error?: any
    errorMessage?: string
    errorCode?: number
    listData?: IRootResponse<IListData>

}