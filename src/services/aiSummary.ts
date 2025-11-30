// services/aiSummary.ts
interface QuestionPlayed {
    question: string;
    selected: string;
    answer: string;
}

interface SummaryPayload {
    score: number;
    maxQuestions: number;
    domain: string;
    questionsPlayed: QuestionPlayed[];
}

export const fetchSummary = async ({
    score,
    maxQuestions,
    domain,
    questionsPlayed,
}: SummaryPayload): Promise<string> => {
    try {
        const EDGE_SUMMARY_URL = import.meta.env.VITE_API_SUMMARY;

        const response = await fetch(EDGE_SUMMARY_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score, maxQuestions, domain, questionsPlayed }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();

        return data.summary || "Résumé indisponible pour le moment.";
    } catch (error) {
        console.error("Erreur fetchSummary :", error);
        return "Impossible de générer le résumé pour le moment.";
    }
};
