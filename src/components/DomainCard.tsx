import React from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DomainCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    path: string;
}

const DomainCard: React.FC<DomainCardProps> = ({ title, description, icon, path }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#021c24] border border-cyan-800 hover:border-cyan-400 p-5 rounded-xl flex flex-col justify-between transition">
            <div>
                <h3 className="font-semibold flex items-center gap-2 mb-1 text-white">
                    {icon} {title}
                </h3>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>

            <button
                onClick={() => navigate(path)}
                className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-full px-4 py-2 flex items-center gap-2 self-end transition"
            >
                <Play size={16} /> Jouer
            </button>
        </div>
    );
};

export default DomainCard;
