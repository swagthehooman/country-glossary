import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

export default function Navbar() {
    const { mode, setMode } = useContext<Boolean | any>(ThemeContext)

    const handleModeChange = (e: React.MouseEvent) => {
        setMode((prev: Boolean) => !prev)
    }

    return (
        <nav className={`${mode ? "bg-dark-blue-dark-element" : "bg-white-light-element"} p-4 pl-16 pr-16 flex justify-between text-xl`}>
            <p>Where in the world?</p>
            <button onClick={handleModeChange} className="flex gap-2 cursor-pointer">
                {mode ? <DarkModeIcon /> : <LightModeIcon />}
                <p>{mode ? "Dark" : "Light"} Mode</p>
            </button>
        </nav>
    )
}