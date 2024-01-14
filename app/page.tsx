"use client"
import { nunito_sans } from "./fontConsts"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';

import CountryTile from "./Components/CountryTile";
import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Components/Navbar";
import { ThemeContext } from "./ThemeContext";

export default function Home() {

  const [showFilterOptions, setShowFilterOptions] = useState<Boolean>(false)

  const [searchInput, setSearchInput] = useState<String>('')

  const { mode, setMode } = useContext<Boolean | any>(ThemeContext)

  const [countryListByRegion, setCountryListByRegion] = useState<CountryTileType[]>(
    [{
      name: '',
      region: '',
      capital: '',
      population: 0,
      flag: ''
    }
    ])

  const filterSelection = useRef<String>('Asia')


  const handleFilterClick = (e: React.MouseEvent) => {
    setShowFilterOptions((prev: Boolean) => !prev)
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

  useEffect(() => {
    // console.log(filterSelection);
    fetch(`https://restcountries.com/v3.1/region/${filterSelection.current}`)
      .then(res => res.json())
      .then(data => {
        var tempData: CountryTileType[] = []
        data.map((i: any) => {
          tempData.push(
            {
              name: i.name.common,
              region: i.region,
              capital: i.capital,
              population: i.population,
              flag: i.flags.svg
            }
          )
        });
        setCountryListByRegion(tempData)
      })
  }, [showFilterOptions])

  return (
    <main className={`${nunito_sans.className} ${mode ? "bg-dark-mode" : "bg-light-mode"} ${mode ? "text-white-dark-text" : "text-dark-blue-light-text"}`}>
      <Navbar />
      <section className="pb-4">
        <div className="mt-8 mb-8 ml-16 mr-16 flex justify-between">
          <div className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} flex gap-4 p-4 w-1/3 rounded-md`}>
            <SearchIcon />
            <input className="bg-transparent border-none outline-none w-full" placeholder="Search for a country.." onChange={handleSearch} />
          </div>
          <div className="relative">
            <button onClick={handleFilterClick} className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} rounded-md flex items-center justify-between gap-3 p-4`} >{filterSelection.current}{showFilterOptions ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</button>
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
        <div className="grid grid-cols-4 m-16 gap-16">
          {countryListByRegion.map((i, index) => <CountryTile key={index} countryData={i} />)}
        </div>
      </section>
    </main>
  )
}
