import Link from 'next/link';
import data from '../../data.json';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

export default function CountryTile({ countryData }: { countryData: CountryTileType }) {

    const { mode, setMode } = useContext<Boolean | any>(ThemeContext)

    return <Link href={`/country/${countryData.name}`}>
        <div className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} overflow-hidden rounded-md`}>
            <img src={countryData.flag} alt="Country flag" />
            <div className='p-8'>
                <p className='text-xl pb-4'>{countryData.name}</p>
                <p className='text-homepage-items' >Population: <span className='text-dark-gray-input'>{countryData.population}</span></p>
                <p className='text-homepage-items'>Region: <span className='text-dark-gray-input'>{countryData.region}</span></p>
                <p className='text-homepage-items'>Capital: <span className='text-dark-gray-input'>{countryData.capital}</span></p>
            </div>
        </div>
    </Link>
}