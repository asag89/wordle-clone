import { useState } from "react"


const Modal = ({ isCorrect, turn, solution, setShowModal, reset }) => {

    const [loading, setloading] = useState(false)
    const handleClick = () => {
        setloading(true)
        setTimeout(() => {
            reset();
            setShowModal(false)
            setloading(false)
        }, 2000)
    }
    return (
        <div className='modal-container' onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-msg">{isCorrect ? "You win! Well done" : "Unlucky! Better next time"}</div>
                <div className="modal-solution">{solution}</div>
                {isCorrect &&
                    <div className="modal-turn-msg">You found the solution in {turn} guesses</div>
                }
                <button onClick={handleClick} className="reset-btn">{loading ? "Loading..." : "Reset"}</button>
            </div>
        </div>
    )
}

export default Modal