import { useEffect, useState } from "react"
import { words } from "../data/words";

const useWordle = () => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState("")
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})
    const [solution, setSolution] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        createSolution()
    }, [])

    const createSolution = () => {
        const randomSolution = words[Math.floor(Math.random() * words.length)]
        setSolution(randomSolution.word)
    }
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((letter) => {
            return { key: letter, color: "grey" }
        })

        formattedGuess.forEach((letter, i) => {
            if (solutionArray[i] === letter.key) {
                formattedGuess[i].color = "green"
                solutionArray[i] = null
            }
        })

        // find any yellow colors 
        formattedGuess.forEach((letter, i) => {
            if (solutionArray.includes(letter.key) && letter.color !== "green") {
                formattedGuess[i].color = "yellow"
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn(prevTurn => prevTurn + 1)
        setUsedKeys((prevUsedKeys) => {
            let newKeys = { ...prevUsedKeys }

            formattedGuess.forEach((letter) => {
                const currentColor = newKeys[letter.key]

                if (letter.color === "green") {
                    newKeys[letter.key] = "green"
                    return
                }
                if (letter.color === "yellow" && currentColor !== "green") {
                    newKeys[letter.key] = "yellow"
                    return
                }
                if (letter.color === "grey" && currentColor !== "green" && currentColor !== "yellow") {
                    newKeys[letter.key] = "grey"
                    return
                }
            })
            return newKeys
        })
        setCurrentGuess("")
    }

    const handleKeyup = ({ key }) => {

        if (key === "Enter") {
            if (turn > 5) {
                setError("you used all guesses")
                clearError()
                return
            }

            if (history.includes(currentGuess)) {
                setError("you already tried that word")
                clearError()
                return
            }

            if (currentGuess.length !== 5) {
                setError("guess must be five chars long")
                clearError()
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }
        if (key === "Backspace") {
            setCurrentGuess((prev) => prev.slice(0, - 1))
            return
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => prev + key)
            }
        }
    }

    const clearError = () => {
        setTimeout(() => {
            setError("")
        }, 2000)
    }

    const reset = () => {
        setTurn(0)
        setCurrentGuess("")
        setGuesses([...Array(6)])
        setHistory([])
        setIsCorrect(false)
        setUsedKeys({})
        setSolution(null)
        setError("")

        createSolution()
    }

    return { solution, turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys, error, reset }
}

export default useWordle