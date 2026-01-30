import React from "react";
import DomainCard from "./DomainCard";
import { Smartphone, CreditCard, Users, Wifi } from "lucide-react";

const DomainGrid: React.FC = () => {
    const domains = [
        {
            title: "Usages du smartphone",
            description: "Sécurité des applications, réglages et données personnelles.",
            icon: <Smartphone size={18} />,
            path: "/quiz/smartphone",
        },
        {
            title: "Paiements et transactions",
            description: "Moyens de paiement numériques et prévention des fraudes.",
            icon: <CreditCard size={18} />,
            path: "/quiz/paiements",
        },
        {
            title: "Réseaux sociaux et échanges",
            description: "Gestion des profils, messages et informations partagées.",
            icon: <Users size={18} />,
            path: "/quiz/reseaux-sociaux",
        },
        {
            title: "Navigation sur Internet",
            description: "Connexion, consultation de sites et téléchargements.",
            icon: <Wifi size={18} />,
            path: "/quiz/navigation",
        },
    ];

    return (
        <section className="mt-8">
            <h3 className="text-white font-semibold mb-4">
                Sélectionnez un domaine
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {domains.map((domain, index) => (
                    <DomainCard key={index} {...domain} />
                ))}
            </div>
        </section>
    );
};

export default DomainGrid;
