'use client'

import { nunito_sans } from "@/app/fontConsts"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from "@/app/Components/Navbar";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/app/ThemeContext";
import Link from "next/link";
import { getCountryData } from "@/app/utils/getCountryData";
// import getCountryData from "@/app/utils/getCountryData";

export default function countryPage({ params }: { params: { country: String } }) {

    const { mode } = useContext<Boolean | any>(ThemeContext)

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

    const [isLoading, setIsLoading] = useState<Boolean>(true)

    const getData = async () => {
        setCountryData(await getCountryData(params.country))
    }

    useEffect(() => {
        getData();
        setIsLoading(false)

    }, [])


    return (
        <main className={`${nunito_sans.className} ${mode ? "bg-dark-mode" : "bg-light-mode"} ${mode ? "text-white-dark-text" : "text-dark-blue-light-text"} min-[640px]:h-full`}>
            <Navbar />
            {isLoading ?
                <section className="pb-4 grid place-content-center">
                    <p>Loading</p>
                </section> :
                <section className="pb-4 max-[640px]:text-sm">
                    <div className="mt-8 mb-8 ml-16 max-[640px]:m-4">
                        <Link href={'/'}>
                            <button className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} pt-2 pb-2 p-6 rounded-md`}>
                                <ArrowBackIcon /> Back
                            </button>
                        </Link>
                    </div>
                    <div className="ml-16 mr-16 flex justify-between items-center max-[640px]:flex-col max-[640px]:m-4">
                        <div className="w-[45%] max-[640px]:w-full max-[640px]:mb-8 max-[640px]:mt-8">
                            <img src={countryData.flag} alt="Flag" />
                        </div>
                        <div className="w-[45%] max-[640px]:w-full">
                            <p className="text-3xl mb-4">{countryData.name}</p>
                            <div className="flex justify-between max-[640px]:flex-col max-[640px]:gap-4">
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
                            <div className="mt-16 flex gap-2 items-center max-[640px]:flex-col max-[640px]:items-start max-[640px]:mt-8">
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
            }
        </main>
    )
}

