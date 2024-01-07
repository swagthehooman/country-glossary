'use server'

export function getCountryData(country: String) {
    const response = fetch(`https://restcountries.com/v3.1/name/${country}`)
}

export function getRandomCountries(count: Number) {
    const response = fetch(`https://restcountries.com/v3.1/all`)
    const randomCountries: CountrySlug[] = []

}