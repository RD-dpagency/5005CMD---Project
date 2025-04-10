"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Timer, AlertCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Lightbulb } from "lucide-react"
import confetti from "canvas-confetti"

// Quiz questions data
const quizData = [
    {
        id: 1,
        question: "Study of life's variety",
        options: ["Ecology", "Biodiversity", "Conservation", "History"],
        correctAnswer: "Biodiversity",
        image: "/q1.jpeg/?height=150&width=300",
    },
    {
        id: 2,
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean",
        image: "/q2.jpeg?height=150&width=300",
    },
    {
        id: 3,
        question: "Ecology studies organism-environment ________?",
        options: ["Variety", "Interactions", "Technology", "Ethics"],
        correctAnswer: "Interactions",
        image: "/q3.jpeg?height=150&width=300",
    },
    {
        id: 4,
        question: "Wildlife exploration studies animals in their ________?",
        options: ["Zoos", "Habitats", "History", "Labs"],
        correctAnswer: "Habitats",
        image: "/q4.jpeg?height=150&width=300",
    },
    {
        id: 5,
        question: "Conservation technology applies ________ to conservation?",
        options: ["Ethics", "History", "Technology", "Ecology"],
        correctAnswer: "Technology",
        image: "/q5.jpeg?height=150&width=300",
    },
]

// Game states
type GameState = "start" | "playing" | "result"

export default function QuizGame() {
    const [gameState, setGameState] = useState<GameState>("start")
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [score, setScore] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const [timeLeft, setTimeLeft] = useState(15)
    const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | null>(null)

    // Timer effect
    useEffect(() => {
        if (gameState !== "playing" || showAnswer) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    handleAnswerSubmit(null)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [gameState, currentQuestion, showAnswer])

    // Start the game
    const startGame = () => {
        setGameState("playing")
        setCurrentQuestion(0)
        setScore(0)
        setTimeLeft(15)
    }

    // Handle answer selection
    const handleAnswerSelect = (answer: string) => {
        if (showAnswer) return
        setSelectedAnswer(answer)
    }

    // Submit answer and check if correct
    const handleAnswerSubmit = (answer: string | null) => {
        const currentQuiz = quizData[currentQuestion]

        if (answer === currentQuiz.correctAnswer) {
            setScore((prev) => prev + 1)
            setAnswerStatus("correct")

            // Trigger confetti for correct answers
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            })
        } else {
            setAnswerStatus("incorrect")
        }

        setShowAnswer(true)
        setTimeLeft(0)
    }

    // Move to next question or end game
    const handleNextQuestion = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion((prev) => prev + 1)
            setSelectedAnswer(null)
            setShowAnswer(false)
            setTimeLeft(15)
            setAnswerStatus(null)
        } else {
            setGameState("result")

            // Big confetti for game completion
            if (score > quizData.length / 2) {
                confetti({
                    particleCount: 200,
                    spread: 160,
                    origin: { y: 0.6 },
                })
            }
        }
    }

    // Restart the game
    const restartGame = () => {
        setGameState("start")
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setScore(0)
        setShowAnswer(false)
        setAnswerStatus(null)
    }

    // Render different game states
    const renderGameState = () => {
        switch (gameState) {
            case "start":
                return <StartScreen onStart={startGame} />
            case "playing":
                return (
                    <QuestionScreen
                        quizItem={quizData[currentQuestion]}
                        totalQuestions={quizData.length}
                        currentQuestion={currentQuestion}
                        selectedAnswer={selectedAnswer}
                        showAnswer={showAnswer}
                        timeLeft={timeLeft}
                        score={score}
                        answerStatus={answerStatus}
                        onAnswerSelect={handleAnswerSelect}
                        onAnswerSubmit={handleAnswerSubmit}
                        onNextQuestion={handleNextQuestion}
                    />
                )
            case "result":
                return <ResultScreen score={score} totalQuestions={quizData.length} onRestart={restartGame} />
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={gameState + currentQuestion}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderGameState()}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

// Start Screen Component
function StartScreen({ onStart }: { onStart: () => void }) {
    return (
        <Card className="w-full bg-white dark:bg-gray-800 shadow-xl border-0">
            <CardHeader className="text-center pb-2">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center mb-4"
                >
                    <Lightbulb size={80} className="text-yellow-400" />
                </motion.div>
                <motion.h1
                    className="text-4xl font-bold text-primary"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Quiz Challenge
                </motion.h1>
                <motion.p
                    className="text-muted-foreground mt-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Test your knowledge with our interactive quiz!
                </motion.p>
            </CardHeader>
            <CardContent className="text-center py-6">
                <motion.ul
                    className="space-y-2 text-left mx-auto max-w-md mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>5 challenging questions</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Timer className="h-5 w-5 text-blue-500" />
                        <span>15 seconds per question</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <span>Earn points for correct answers</span>
                    </li>
                </motion.ul>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" onClick={onStart} className="px-8 py-6 text-lg font-semibold">
                        Start Quiz
                    </Button>
                </motion.div>
            </CardFooter>
        </Card>
    )
}

// Question Screen Component
function QuestionScreen({
    quizItem,
    totalQuestions,
    currentQuestion,
    selectedAnswer,
    showAnswer,
    timeLeft,
    score,
    answerStatus,
    onAnswerSelect,
    onAnswerSubmit,
    onNextQuestion,
}: {
    quizItem: (typeof quizData)[0]
    totalQuestions: number
    currentQuestion: number
    selectedAnswer: string | null
    showAnswer: boolean
    timeLeft: number
    score: number
    answerStatus: "correct" | "incorrect" | null
    onAnswerSelect: (answer: string) => void
    onAnswerSubmit: (answer: string | null) => void
    onNextQuestion: () => void
}) {
    return (
        <Card className="w-full bg-white dark:bg-gray-800 shadow-xl border-0">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-1">
                    <div className="text-sm font-medium text-muted-foreground">
                        Question {currentQuestion + 1}/{totalQuestions}
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-yellow-500" />
                        <span className="font-semibold">{score}</span>
                    </div>
                </div>
                <Progress value={(timeLeft / 15) * 100} className="h-2 mb-4" />
                <div className="flex items-center gap-2 mb-2">
                    <Timer size={18} className={`${timeLeft < 5 ? "text-red-500" : "text-blue-500"}`} />
                    <span className={`font-medium ${timeLeft < 5 ? "text-red-500" : ""}`}>{timeLeft} seconds left</span>
                </div>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="mb-6 rounded-lg overflow-hidden">
                    <img
                        src={quizItem.image || "/placeholder.svg"}
                        alt="Question illustration"
                        className="w-full h-[150px] object-cover"
                    />
                </div>

                <h2 className="text-xl font-semibold mb-6">{quizItem.question}</h2>

                <div className="grid gap-3">
                    {quizItem.options.map((option) => {
                        const isCorrect = option === quizItem.correctAnswer
                        const isSelected = option === selectedAnswer

                        let optionClass = "border-2 p-4 rounded-lg transition-all duration-200 flex items-center"

                        if (showAnswer) {
                            if (isCorrect) {
                                optionClass += " bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600"
                            } else if (isSelected && !isCorrect) {
                                optionClass += " bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-600"
                            } else {
                                optionClass += " opacity-60"
                            }
                        } else {
                            optionClass += isSelected
                                ? " border-primary bg-primary/10"
                                : " border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5"
                        }

                        return (
                            <motion.div
                                key={option}
                                whileHover={!showAnswer ? { scale: 1.01 } : {}}
                                whileTap={!showAnswer ? { scale: 0.99 } : {}}
                                onClick={() => !showAnswer && onAnswerSelect(option)}
                                className={optionClass}
                            >
                                <div className="flex-1">{option}</div>
                                {showAnswer && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                                {showAnswer && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                            </motion.div>
                        )
                    })}
                </div>

                {answerStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${answerStatus === "correct"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                    >
                        {answerStatus === "correct" ? (
                            <>
                                <CheckCircle2 className="h-5 w-5" />
                                <span>Correct! Great job!</span>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="h-5 w-5" />
                                <span>Incorrect. The correct answer is {quizItem.correctAnswer}.</span>
                            </>
                        )}
                    </motion.div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                {!showAnswer ? (
                    <Button onClick={() => onAnswerSubmit(selectedAnswer)} disabled={!selectedAnswer} className="w-full">
                        Submit Answer
                    </Button>
                ) : (
                    <Button onClick={onNextQuestion} className="w-full">
                        {currentQuestion < totalQuestions - 1 ? (
                            <>
                                Next Question <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        ) : (
                            "See Results"
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

// Result Screen Component
function ResultScreen({
    score,
    totalQuestions,
    onRestart,
}: {
    score: number
    totalQuestions: number
    onRestart: () => void
}) {
    const percentage = Math.round((score / totalQuestions) * 100)

    let resultMessage = ""
    let resultIcon = null

    if (percentage >= 80) {
        resultMessage = "Excellent! You're a quiz master!"
        resultIcon = <Trophy size={80} className="text-yellow-500" />
    } else if (percentage >= 60) {
        resultMessage = "Good job! You know your stuff!"
        resultIcon = <CheckCircle2 size={80} className="text-green-500" />
    } else {
        resultMessage = "Keep practicing! You'll get better!"
        resultIcon = <Lightbulb size={80} className="text-blue-500" />
    }

    return (
        <Card className="w-full bg-white dark:bg-gray-800 shadow-xl border-0">
            <CardHeader className="text-center pb-2">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-4"
                >
                    {resultIcon}
                </motion.div>
                <motion.h1
                    className="text-3xl font-bold text-primary"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Quiz Complete!
                </motion.h1>
            </CardHeader>
            <CardContent className="text-center py-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="text-6xl font-bold mb-2">
                        {score}/{totalQuestions}
                    </div>
                    <div className="text-xl text-muted-foreground">{percentage}% Score</div>
                </motion.div>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-lg mb-8"
                >
                    {resultMessage}
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Progress value={percentage} className="h-3 mb-2" />
                </motion.div>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" onClick={onRestart} className="px-8 py-6 text-lg font-semibold">
                        <RotateCcw className="mr-2 h-5 w-5" /> Play Again
                    </Button>
                </motion.div>
            </CardFooter>
        </Card>
    )
}

