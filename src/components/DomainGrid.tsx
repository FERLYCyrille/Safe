import React from "react";
import DomainCard from "./DomainCard";
import { Lock, CreditCard, ShoppingBag, Globe } from "lucide-react";

const DomainGrid: React.FC = () => {
    const domains = [
        {
            title: "Vie privée & réseaux sociaux",
            description: "Protège tes infos, paramètres et profils en ligne.",
            icon: <Lock size={18} />,
            path: "/quiz/vie-privee",
        },
        {
            title: "Paiement mobile & arnaques",
            description: "Déjoue les escroqueries et sécurise tes transactions.",
            icon: <CreditCard size={18} />,
            path: "/quiz/paiement",
        },
        {
            title: "Commerce & entreprises",
            description: "Protège tes ventes, tes données et tes clients.",
            icon: <ShoppingBag size={18} />,
            path: "/quiz/commerce",
        },
        {
            title: "Culture numérique & souveraineté",
            description: "Comprends les enjeux, du local à l’Afrique numérique.",
            icon: <Globe size={18} />,
            path: "/quiz/souverainete",
        },
    ];

    return (
        <section className="mt-8">
            <h3 className="text-white font-semibold mb-4">Choisis ton domaine</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {domains.map((domain, index) => (
                    <DomainCard key={index} {...domain} />
                ))}
            </div>
        </section>
    );
};

export default DomainGrid;
