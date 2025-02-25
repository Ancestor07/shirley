import {format} from "date-fns";

export default class DateHelper {
    public toFormatDate(date: Date | string | number, formatTime: FormatDateType): string {
        const convertDate = new Date(date)
        return format(new Date(convertDate.toString()), formatTime)
    }
}

export type FormatDateType =
    | "yyyy-MM-dd"
    | "dd-MM-yyyy"
    | "do MMM yyyy"
    | "yyyy - MM - dd"
    | "do MMM"
    | "LLL dd, yyyy"
    | "LLL dd, yyyy - hh:mm:ss"
    | "LLL dd, yyyy - HH:mm:ss"
    | "HH.mm"
    | "dd MMMM yyyy"
    | "yyyy-MM-dd HH:mm"
    | "yyyy-MM-dd HH:mm:ss"
    | "HH : mm"
    | "dd-MM-yyyy HH:mm"
    | "HH:mm:ss"
    | "HH:mm"

export const DATE_FORMAT_CONSTANT = {
    ISO_DATE: "yyyy-MM-dd" as FormatDateType,
    ISO_DATE_TIME: "yyyy-MM-dd HH:mm:ss" as FormatDateType,
    ISO_TIME: "HH:mm:ss" as FormatDateType,
    EUROPEAN_TIME: "HH:mm" as FormatDateType,
    EUROPEAN_DATE_TIME: "dd-MM-yyyy HH:mm" as FormatDateType,
    EUROPEAN_DATE: "dd MM yyyy" as FormatDateType,
    FULL_MONTH_DATE: "dd MMMM yyyy" as FormatDateType,
    DASHED_EUROPEAN_DATE: "DD-MM-YYYY" as FormatDateType,
    EUROPEAN_DATE_FORMAT: "dd-MM-yyyy" as FormatDateType,
}