export async function getQuestion(domain: string, level: string) {
    try {
        const response = await fetch(import.meta.env.VITE_API_QUIZ, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ domain, level }),
        });

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error(data?.error || "Quiz invalide");
        }

        return data;

    } catch (err) {
        console.error(err);
        return [];
    }
}
