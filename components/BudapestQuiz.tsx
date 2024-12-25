import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const quizQuestions = [
    {
        question: "What is the capital of Hungary?",
        options: ["Vienna", "Prague", "Budapest", "Bucharest"],
        correctAnswer: "Budapest"
    },
    {
        question: "Which river runs through Budapest?",
        options: ["Danube", "Rhine", "Vistula", "Thames"],
        correctAnswer: "Danube"
    },
    {
        question: "What is the famous thermal bath in Budapest?",
        options: ["Blue Lagoon", "Széchenyi", "Roman Baths", "Hamam"],
        correctAnswer: "Széchenyi"
    },
    {
        question: "What are the two parts of Budapest separated by the Danube River?",
        options: ["Buda and Pest", "Old and New", "North and South", "East and West"],
        correctAnswer: "Buda and Pest"
    },
    {
        question: "What is the name of the iconic bridge connecting Buda and Pest?",
        options: ["Golden Gate Bridge", "Chain Bridge", "Charles Bridge", "Liberty Bridge"],
        correctAnswer: "Chain Bridge"
    },
    {
        question: "What is the national dish of Hungary?",
        options: ["Goulash", "Paella", "Sushi", "Pasta"],
        correctAnswer: "Goulash"
    },
    {
        question: "What is the currency used in Hungary?",
        options: ["Euro", "Hungarian Forint", "Zloty", "Krona"],
        correctAnswer: "Hungarian Forint"
    },
    {
        question: "What is the name of Hungary's largest lake?",
        options: ["Lake Balaton", "Lake Geneva", "Lake Bled", "Lake Garda"],
        correctAnswer: "Lake Balaton"
    },
    {
        question: "What is the name of the parliament building in Budapest?",
        options: ["House of Commons", "Hungarian Parliament", "National Assembly", "The Danube Hall"],
        correctAnswer: "Hungarian Parliament"
    },
    {
        question: "Which island on the Danube is a popular recreational spot in Budapest?",
        options: ["Margaret Island", "Coney Island", "Treasure Island", "Andrássy Island"],
        correctAnswer: "Margaret Island"
    }
];

export function BudapestQuiz({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [showResults, setShowResults] = useState(false)

    const handleAnswer = (answer: string) => {
        const newAnswers = [...selectedAnswers]
        newAnswers[currentQuestion] = answer
        setSelectedAnswers(newAnswers)
    }

    const handleNext = () => {
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setShowResults(true)
        }
    }

    const currentQuestionData = quizQuestions[currentQuestion]

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Budapest Quiz</DialogTitle>
                    <DialogDescription>
                        Test your knowledge about Budapest!
                    </DialogDescription>
                    <p className="mt-2 text-sm text-muted-foreground">Tip: Refresh page to try again</p>
                </DialogHeader>
                {!showResults ? (
                    <>
                        <div className="py-4">
                        <h3 className="mb-4 text-lg font-medium">{currentQuestionData.question}</h3>
                            <RadioGroup onValueChange={handleAnswer} value={selectedAnswers[currentQuestion]}>
                                {currentQuestionData.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`option-${index}`} />
                                        <Label htmlFor={`option-${index}`}>{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestion]}>
                                {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <div className="py-4">
                        <h3 className="mb-4 text-lg font-medium">Quiz Results</h3>
                        {(() => {
                            const correctAnswers = selectedAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length;
                            const allCorrect = correctAnswers === quizQuestions.length;
                            return (
                                <>
                                    <p className="mb-4">
                                        You answered {correctAnswers} out of {quizQuestions.length} questions correctly!
                                    </p>
                                    {allCorrect ? (
                                        <p className="text-xl font-bold text-center text-green-600">You&apos;re ready for Budapest BB!</p>
                                    ) : (
                                        <p className="text-xl font-bold text-center text-yellow-600">Try harder Dumb Dumb</p>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

