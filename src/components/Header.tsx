import React from "react";
import logo from '../assets/logo.png';

const Header: React.FC = () => {
    return (
        <header className="bg-[#002b36] border-b border-cyan-800 flex flex-col md:flex-row items-center justify-between px-6 py-4 text-white">
            {/* Logo + Nom */}
            <div className="flex items-center gap-3 mb-2 md:mb-0">
                <img src={logo} alt="Safe Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
                <h1 className="text-lg md:text-2xl font-bold">
                    Safe
                </h1>
            </div>

            {/* Slogan */}
            <p className="text-sm md:text-base text-cyan-300 text-center md:text-right">
                Apprends à te protéger en ligne, en t’amusant !
            </p>
        </header>
    );
};

export default Header;
