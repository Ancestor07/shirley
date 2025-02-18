export interface IListDetailDate {
    ph: number,
    temperature: number,
    date_time: string
    data: IListData[]
}

interface IListData {
    id: string,
    ph: number,
    temperature: number
}