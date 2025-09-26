import React from "react";

const Header = () => {
    return (
        <nav className="max-w-3xl bg-red-600 rounded-r-lg border-2 border-black  transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30  fixed top-60 h-100 w-44 z-10">
        <div className="mx-auto ">
            <div className="relative flex items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Open main menu</span>
                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex flex-col space-y-4">
                            <p>&nbsp;</p>
                            <a href="#presentation" className="text-white hover:bg-white hover:text-red-600 border-2 border-white rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out hover:scale-110">Profil</a>
                            <a href="#informations" className="text-white hover:bg-white hover:text-red-600 border-2 border-white rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out hover:scale-110">Informations</a>
                            <a href="#competences" className="text-white hover:bg-white hover:text-red-600 border-2 border-white rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out hover:scale-110">Compétences</a>
                            <a href="#formations" className="text-white hover:bg-white hover:text-red-600 border-2 border-white rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out hover:scale-110">Formations</a>
                            <a href="#experiences" className="text-white hover:bg-white hover:text-red-600 border-2 border-white rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out hover:scale-110">Expériences</a>
                            <a href="#coordonnees" className="text-white hover:bg-white hover:text-red-600 border-2 border-white rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out hover:scale-110">Coordonnées</a>
                            <p>&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    
    );
  }
  
  export default Header;