
import { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

const Wordle = () => {
    const { solution, currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, error, reset } = useWordle()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup)

        if (isCorrect || turn > 5) {
            setTimeout(() => {
                setShowModal(true)
            }, 2000)
            window.removeEventListener("keyup", handleKeyup)
        }

        return () => {
            window.removeEventListener("keyup", handleKeyup)
        }
    }, [handleKeyup, isCorrect, turn])


    return (
        <div className='container'>
            <h1>Wordle</h1>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            {error &&
                <div className='error-msg'>{error}</div>
            }
            <Keypad usedKeys={usedKeys} solution={solution} handleKeyup={handleKeyup} />
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} setShowModal={setShowModal} reset={reset} />}
        </div>
    )
}

export default Wordle