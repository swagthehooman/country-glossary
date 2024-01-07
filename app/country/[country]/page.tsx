'use client'

import { nunito_sans } from "@/app/fontConsts"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import data from '../../../data.json'
import Navbar from "@/app/Components/Navbar";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/app/ThemeContext";
import Link from "next/link";
// import getCountryData from "@/app/utils/getCountryData";

export default function countryPage({ params }: { params: { country: String } }) {

    const { mode, setMode } = useContext<Boolean | any>(ThemeContext)

    const [countryData, setCountryData] = useState<CountrySlug>({
        name: '',
        area: 0,
        borders: [],
        capital: [],
        currencies: '',
        flag: '',
        languages: '',
        nativeName: '',
        population: 0,
        region: '',
        subregion: '',
        topLevelDomain: [],
        maps: ''
    })
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        console.log(params.country)
        fetch(`https://restcountries.com/v3.1/name/${params.country}?fullText=true`)
            .then(res => res.json())
            .then(data => {

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
                setCountryData(dataInfered)
                setLoading(false)
            })
    }, [])

    if (isLoading)
        return <p>Loading...</p>


    return (
        <main className={`${nunito_sans.className} ${mode ? "bg-dark-mode" : "bg-light-mode"} ${mode ? "text-white-dark-text" : "text-dark-blue-light-text"} h-full`}>
            <Navbar />
            <section className="pb-4">
                <div className="mt-8 mb-8 ml-16">
                    <Link href={'/'}>
                        <button className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} pt-2 pb-2 p-6 rounded-md`}>
                            <ArrowBackIcon /> Back
                        </button></Link>
                </div>
                <div className="ml-16 mr-16 flex justify-between items-center">
                    <div className="w-[45%]">
                        <img src={countryData.flag} alt="Flag" />
                    </div>
                    <div className="w-[45%]">
                        <p className="text-3xl mb-4">{countryData.name}</p>
                        <div className="flex justify-between">
                            <div>
                                <p>Native Name: <span className='text-dark-gray-input'>{countryData.nativeName}</span></p>
                                <p>Population: <span className='text-dark-gray-input'>{countryData.population}</span></p>
                                <p>Region: <span className='text-dark-gray-input'>{countryData.region}</span></p>
                                <p>Sub Region: <span className='text-dark-gray-input'>{countryData.subregion}</span></p>
                                <p>Capital: <span className='text-dark-gray-input'>{countryData.capital}</span></p>
                            </div>
                            <div>
                                <p>Top Level Domain: <span className='text-dark-gray-input'>{countryData.topLevelDomain}</span></p>
                                <p>Area: <span className='text-dark-gray-input'>{countryData.area}</span></p>
                                <p>Currencies: <span className='text-dark-gray-input'>{countryData.currencies}</span></p>
                                <p>Languages: <span className='text-dark-gray-input'>{countryData.languages}</span></p>
                            </div>
                        </div>
                        <div className="mt-16 flex gap-2 items-center">
                            <p>Border Countries: </p>
                            <div className="grid grid-cols-4 gap-2">
                                {
                                    countryData.borders?.map((i, index) => <button key={index} className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} pt-2 pb-2 p-6 rounded-md`}>{i}</button>)
                                }
                            </div>
                        </div>
                        <div className="mt-16 flex gap-2 items-center">
                            <a className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} pt-2 pb-2 p-6 rounded-md`} href={countryData.maps} target="_blank">Google Maps Location</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

