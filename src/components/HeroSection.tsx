import React from "react";
import safe from '../assets/quiz.jpg'

const HeroSection: React.FC = () => {
    return (
        <section className="bg-[#003b46] text-white p-6 rounded-lg flex flex-col md:flex-row justify-between items-center gap-6 mt-6">
            <div className="max-w-xl">
                <h2 className="text-2xl font-semibold mb-2">
                    Explore le jeu et progresse en cybersécurité
                </h2>
                <p className="text-gray-300 text-sm">
                    Choisis un domaine, relève des défis et débloque des badges.
                    Deviens le héros de la sécurité numérique.
                </p>
            </div>
            <img
                src={safe}
                alt="cyber learning"
                className="rounded-lg w-full md:w-72 object-cover"
            />
        </section>
    );
};

export default HeroSection;
