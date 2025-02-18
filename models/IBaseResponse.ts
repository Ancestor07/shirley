import {AxiosResponse} from "axios";
import {PayloadAction} from "@reduxjs/toolkit";

export interface IRootResponse<T> {
    success?: boolean
    loading?: boolean
    data?: T
}

interface IBasePayload<T> {
    data?: T
    loading?: boolean
}


export type IBaseResponse<T> = AxiosResponse<IRootResponse<T>>
export type IBasePayloadAction<T> = PayloadAction<IBasePayload<T>>