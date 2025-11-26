export async function getQuestion(domain: string, level: string) {
    try {
        const response = await fetch(import.meta.env.VITE_API_QUIZ, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ domain, level }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Erreur lors de la récupération de la question :", err);
        return { error: "Impossible de récupérer la question" };
    }
}
