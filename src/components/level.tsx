import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import { CheckCircle, Flame, Zap } from "lucide-react";

const NiveauQuiz: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const navigate = useNavigate();

    const levels = [
        {
            name: "Facile",
            description: "Idéal pour commencer en douceur.",
            color: "from-green-400/40 to-green-700/40",
            border: "border-green-400",
            icon: <CheckCircle size={38} className="text-green-400" />,
        },
        {
            name: "Moyen",
            description: "Un bon équilibre entre challenge et apprentissage.",
            color: "from-yellow-400/40 to-yellow-700/40",
            border: "border-yellow-400",
            icon: <Flame size={38} className="text-yellow-400" />,
        },
        {
            name: "Difficile",
            description: "Questions complexes pour les plus expérimentés.",
            color: "from-red-400/40 to-red-700/40",
            border: "border-red-400",
            icon: <Zap size={38} className="text-red-400" />,
        },
    ];

    const handleLevelSelect = (level: string) => {
        navigate(`/quiz/${domain}/play?level=${level.toLowerCase()}`);
    };

    return (
        <div className="min-h-screen bg-[#001b22] text-white px-4 sm:px-8 pb-10 flex flex-col">
            <Header />

            <div className="max-w-6xl mx-auto mt-20">
                <h2 className="text-4xl font-extrabold mb-12 text-center tracking-wide">
                    Choisis ton niveau – <span className="text-amber-400">{domain}</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {levels.map((lvl) => (
                        <div
                            key={lvl.name}
                            className={`rounded-xl p-8 bg-linear-to-br ${lvl.color} border ${lvl.border} 
                                       shadow-xl shadow-black/40 backdrop-blur-lg cursor-pointer
                                       transform hover:-translate-y-2 hover:shadow-2xl transition duration-300`}
                            onClick={() => handleLevelSelect(lvl.name)}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                {lvl.icon}
                                <h3 className="text-2xl font-bold">{lvl.name}</h3>
                            </div>

                            <p className="text-gray-200 mb-8 leading-relaxed">{lvl.description}</p>

                            <button
                                className="mt-auto w-full py-3 rounded-lg bg-white/10 border border-white/20
                                           hover:bg-white/20 transition text-white font-semibold"
                            >
                                Sélectionner
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NiveauQuiz;
