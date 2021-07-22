export interface IMovie {

    id: string,
    url: string,
    name: string,
    season: number,
    number: number,
    type: string,
    airdate: Date,
    airtime: Date,
    airstamp: Date,
    runtime: string,
    image: string | null,
    summary: string | null,
    _links: any,
    _embedded: IMovie

}