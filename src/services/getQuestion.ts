export async function getQuestion(domain: string, level: string) {
    const response = await fetch(
        "https://utfbjjqorwiqweyfaxck.functions.supabase.co/generate-question", // ← note le .functions
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ domain, level })
        }
    );

    return response.json();
}
