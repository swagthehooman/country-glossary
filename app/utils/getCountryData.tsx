'use server'

export async function getCountryData(country: String) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`, { cache: "no-cache" })
    if (!res) {

    }
    const data = await res.json()
    let currency: String[] = []
    let language: String[] = []
    let native: String[] = []

    for (const x in data[0].currencies) {
        currency.push(data[0].currencies[x].name)
    }
    for (const x in data[0].languages) {
        language.push(data[0].languages[x])
    }
    for (const x in data[0].name.nativeName) {
        native.push(data[0].name.nativeName[x].official)
    }

    let dataInfered: CountrySlug = {
        name: data[0].name.common,
        area: data[0].area,
        borders: data[0].borders,
        capital: data[0].capital,
        currencies: currency.join(', '),
        flag: data[0].flags.svg,
        languages: language.join(', '),
        nativeName: native.join(', '),
        population: data[0].population,
        region: data[0].region,
        subregion: data[0].subregion,
        topLevelDomain: data[0].tld,
        maps: data[0].maps.googleMaps
    }

    return dataInfered
}

export async function getCountryListByHalfName(country: String) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`, { cache: "no-cache" })
    if (!res) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json()
    let tempData: CountryTileType[] = []
    await data.map((i: any) => {
        tempData.push(
            {
                name: i.name.common,
                region: i.region,
                capital: i.capital,
                population: i.population,
                flag: i.flags.svg
            }
        )
    })
    return tempData
}

export async function getCountryByRegion(region: String) {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`, { cache: "no-cache" });
    if (!res) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json()
    let tempData: CountryTileType[] = []
    await data.map((i: any) => {
        tempData.push(
            {
                name: i.name.common,
                region: i.region,
                capital: i.capital,
                population: i.population,
                flag: i.flags.svg
            }
        )
    })
    return tempData
}