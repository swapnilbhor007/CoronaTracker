export interface ICase{
    id: number,
    location: string,
    total: number,
    newcases: number,
    deaths: number,
    newdeaths: number,
    recovered: number,
    newrecovered: number,
    active: number,
    tests: number,
    newtests:number,
    recordDate: Date,
    source: string
}