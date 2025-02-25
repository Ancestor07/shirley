import {MonitoringSlice} from "./reducers/monitoring.slice";

export const combineReducers = {
    monitoring: MonitoringSlice.reducer,
}