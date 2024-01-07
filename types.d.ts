type CountrySlug = {
    name: String,
    nativeName: String,
    region: String,
    subregion: String,
    capital: String[],
    population: number,
    area: number,
    flag: string,
    population: Number,
    topLevelDomain: String[],
    currencies: String,
    languages:String,
    borders: String[]
    maps: string
}

type CountryData = {
    data: CountrySlug,
    mode: Boolean
}

type CountryTileType = {
    name: string,
    flag: string,
    population: number,
    region: string,
    capital: string
}

type contextType = {
    mode: Boolean,
    setMode: Function
}