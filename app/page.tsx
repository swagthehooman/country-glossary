"use client"
import { nunito_sans } from "./fontConsts"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';

import CountryTile from "./Components/CountryTile";
import { getCountryByRegion, getCountryListByHalfName } from "./utils/getCountryData";
import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Components/Navbar";
import { ThemeContext } from "./ThemeContext";

export default function Home() {

  const [showFilterOptions, setShowFilterOptions] = useState<Boolean>(false)

  const [searchInput, setSearchInput] = useState<String>('')

  const { mode } = useContext<Boolean | any>(ThemeContext)

  const [countryListByRegion, setCountryListByRegion] = useState<CountryTileType[]>(
    [{
      name: '',
      region: '',
      capital: '',
      population: 0,
      flag: ''
    }
    ])

  const [isLoading, setIsLoading] = useState<Boolean>(true)

  const filterSelection = useRef<String>('Asia')

  const handleFilterClick = (e: React.MouseEvent) => {
    setShowFilterOptions((prev: Boolean) => !prev)
    setIsLoading(true)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase())
  }

  const handleFilterOptionClick = (e: React.MouseEvent<HTMLElement>) => {
    filterSelection.current = e.currentTarget.outerText
    setShowFilterOptions((prev: Boolean) => {
      return !prev
    })
  }

  const getCountriesList = async () => {
    setCountryListByRegion(await getCountryByRegion(filterSelection.current))
  }

  const getCountryListHalfName = async () => {
    setCountryListByRegion(await getCountryListByHalfName(searchInput))
  }

  const handleSearchCountry = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      getCountryListHalfName()
    }
  }

  useEffect(() => {
    getCountriesList()
    setIsLoading(false)
  }, [showFilterOptions])

  return (
    <main className={`${nunito_sans.className} ${mode ? "bg-dark-mode" : "bg-light-mode"} ${mode ? "text-white-dark-text" : "text-dark-blue-light-text"}`}>
      <Navbar />
      {
        isLoading ?
          <section className="pb-4 grid place-content-center">
            <p>Loading</p>
          </section> :
          <section className="pb-4">
            <div className="mt-8 mb-8 ml-16 mr-16 flex justify-between max-[640px]:flex-col max-[640px]:gap-4 max-[640px]:ml-4 max-[640px]:mr-4">
              <div className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} flex gap-4 p-4 w-1/3 rounded-md max-[640px]:w-full`}>
                <SearchIcon />
                <input className="bg-transparent border-none outline-none w-full" placeholder="Search for a country.." onChange={handleSearch} onKeyDown={handleSearchCountry} />
              </div>
              <div className="relative">
                <button onClick={handleFilterClick} className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} rounded-md flex items-center justify-between gap-3 p-4 max-[640px]:w-full`} >{filterSelection.current}{showFilterOptions ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</button>
                {
                  showFilterOptions &&
                  <ul className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} rounded-md bg-dark-blue-dark-element p-4 absolute mt-2 w-full`}>
                    <li onClick={handleFilterOptionClick} className="cursor-pointer">Africa</li>
                    <li className="cursor-pointer" onClick={handleFilterOptionClick}>America</li>
                    <li className="cursor-pointer" onClick={handleFilterOptionClick}>Asia</li>
                    <li className="cursor-pointer" onClick={handleFilterOptionClick}>Europe</li>
                    <li className="cursor-pointer" onClick={handleFilterOptionClick}>Oceania</li>
                  </ul>
                }
              </div>

            </div>
            <div className="grid grid-cols-4 m-16 gap-16 max-[640px]:grid-cols-1 max-[640px]:m-8">
              {countryListByRegion.map((i, index) => <CountryTile key={index} countryData={i} />)}
            </div>
          </section>
      }
    </main>
  )
}
