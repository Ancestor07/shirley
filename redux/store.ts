import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AnyAction, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {combineReducers} from "./rootReducers";

const storeRedux = configureStore({
    reducer: combineReducers
})
export type RootState = ReturnType<typeof storeRedux.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default storeRedux