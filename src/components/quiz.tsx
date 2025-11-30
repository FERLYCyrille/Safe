import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { getQuestion } from "../services/getQuestion";
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
import { fetchSummary } from "../services/aiSummary"; // fonction IA corrigée

interface QuestionPlayed {
    question: string;
    selected: string;
    answer: string;
}

const QuizPlay = () => {
    const navigate = useNavigate();
    const { domain } = useParams();
    const [searchParams] = useSearchParams();
    const level = searchParams.get("level") || "facile";
    const maxQuestions = 10;

    const [question, setQuestion] = useState<any>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [correctionVisible, setCorrectionVisible] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [summary, setSummary] = useState<string | null>(null);
    const [questionsPlayed, setQuestionsPlayed] = useState<QuestionPlayed[]>([]); // suivi des réponses

    useEffect(() => {
        loadQuestion();
    }, []);

    const loadQuestion = async () => {
        if (questionIndex >= maxQuestions) return;

        try {
            const q = await getQuestion(domain!, level);
            if (!q || q.error) {
                navigate("/default");
                return;
            }
            setQuestion(q);
            setSelected(null);
            setCorrectionVisible(false);
        } catch {
            navigate("/default");
        }
    };

    const checkAnswer = (option: string) => {
        setSelected(option);
        setCorrectionVisible(true);

        if (option === question.answer) {
            setScore(prev => prev + 1);
        }

        // Enregistrer la réponse pour analyse IA
        setQuestionsPlayed(prev => [
            ...prev,
            {
                question: question.question,
                selected: option,
                answer: question.answer
            }
        ]);
    };

    const nextQuestion = async () => {
        setQuestionIndex(prev => prev + 1);

        if (questionIndex + 1 < maxQuestions) {
            await loadQuestion();
        } else {
            generateSummary(); // Génération du résumé à la fin
        }
    };

    const generateSummary = async () => {
        if (!questionsPlayed.length) return;

        const payload = {
            score,
            maxQuestions,
            domain: domain || "non spécifié",
            questionsPlayed
        };

        const result = await fetchSummary(payload);
        setSummary(result);
    };

    const progress = ((questionIndex + 1) / maxQuestions) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#001b22] p-6">
            <div className="w-full max-w-2xl space-y-4">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Safe Logo" className="h-20 w-20 md:h-24 md:w-24 object-contain" />
                </div>

                <header className="text-center text-white">
                    <p className="text-gray-300 mb-2">
                        Domaine : <span className="text-blue-400">{domain}</span> | Niveau : <span className="text-blue-400">{level}</span>
                    </p>
                    <p className="text-gray-300 font-semibold mb-2">
                        Question {Math.min(questionIndex + 1, maxQuestions)} / {maxQuestions}
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-blue-500 h-3 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </header>

                {questionIndex >= maxQuestions ? (
                    <div className="bg-[#01232f] rounded-2xl shadow-lg p-8 text-center text-white mt-6">
                        <h2 className="text-2xl font-bold mb-4">🎉 Quiz terminé !</h2>
                        <p>Vous avez répondu correctement à {score} / {maxQuestions} questions.</p>

                        {summary && (
                            <p className="mt-4 text-blue-400 font-semibold">{summary}</p>
                        )}

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                            <button
                                onClick={() => {
                                    setQuestionIndex(0);
                                    setScore(0);
                                    setSummary(null);
                                    setQuestionsPlayed([]);
                                    loadQuestion();
                                }}
                                className="px-6 py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 transition-colors"
                            >
                                Recommencer
                            </button>
                            <Link
                                to="/"
                                className="px-6 py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 transition-colors text-white text-center"
                            >
                                Retourner au menu
                            </Link>
                        </div>
                    </div>
                ) : question ? (
                    <div className="bg-[#01232f] rounded-2xl shadow-lg p-8 space-y-6 mt-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center">{question.question}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {question.options.map((opt: string) => {
                                const isCorrect = correctionVisible && opt === question.answer;
                                const isWrong = correctionVisible && opt === selected && selected !== question.answer;
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => checkAnswer(opt)}
                                        disabled={correctionVisible}
                                        className={`p-4 rounded-xl font-medium text-white transition-transform transform hover:scale-105
                    ${isCorrect ? "bg-green-600 shadow-md" : ""}
                    ${isWrong ? "bg-red-600 shadow-md" : ""}
                    ${!correctionVisible && "bg-gray-800 hover:bg-gray-700"}`}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>

                        {correctionVisible && (
                            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-3">
                                <p className="text-lg font-semibold text-green-800">
                                    {selected === question.answer ? "✔ Bonne réponse !" : "❌ Mauvaise réponse"}
                                </p>
                                <p className="text-gray-300">{question.explanation}</p>
                                <p className="text-gray-400">
                                    La bonne réponse était : <span className="text-green-400">{question.answer}</span>
                                </p>
                                <div className="text-center">
                                    <button
                                        onClick={nextQuestion}
                                        className="mt-2 px-6 py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 transition-colors"
                                    >
                                        Question suivante
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-white text-xl text-center mt-6">Chargement...</p>
                )}
            </div>
        </div>
    );
};

export default QuizPlay;
