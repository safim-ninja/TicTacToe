import { DarkMode, LightMode } from '@mui/icons-material';
import { useEffect, useState } from 'react';
export default function Navbar() {
    const [darkMode, setDarkMode] = useState(() => {
        const localDark = localStorage.getItem('localDark');
        return localDark === 'true';
    });

    useEffect(() => {
        darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark');
        localStorage.setItem('localDark', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    }
    return (
        <>
            <nav className="bg-white dark:bg-slate-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 border-b border-slate-300 dark:border-slate-900">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tic Tac Toe</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700">
                    <li className='flex items-center'>
                        <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Tic Tac Toe</a>
                    </li>
                    <li>
                        <button title={darkMode ? 'Light Mode' : 'Dark Mode'}
                        onClick={toggleDarkMode}
                        className="font-medium rounded px-3 py-1 mx-1
                        bg-sky-500      dark:bg-slate-700
                        text-amber-500  dark:text-slate-400
                        hover:text-amber-300 dark:hover:text-blue-500
                        hover:bg-sky-400 dark:hover:bg-slate-900">
                            {
                                darkMode ? <DarkMode /> : <LightMode />
                            }
                        </button>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </>
    );
}
