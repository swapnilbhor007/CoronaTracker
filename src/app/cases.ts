export interface ICase{
    id: number,
    location: string,
    total: number,
    newcases: number,
    deaths: number,
    newdeaths: number,
    recovered: number,
    active: number,
    tests: number,
    eventDate: Date
}