import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import DomainGrid from "../components/DomainGrid";
import { Rocket } from "lucide-react";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#001b22] text-white px-4 sm:px-8 pb-10">
            <Header />
            <main className="max-w-6xl mx-auto mt-4">
                <HeroSection />
                <DomainGrid />
                <div className="flex justify-center mt-8">
                    <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-3 rounded-full font-semibold transition">
                        <Rocket size={18} /> Commencer ma mission
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Home;
