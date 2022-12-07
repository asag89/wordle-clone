
import Row from './Row'

const Grid = ({ currentGuess, guesses, turn }) => {
    return (
        <div className='grid-container'>
            {guesses.map((guess, i) => {
                if (turn === i) {
                    return <Row currentGuess={currentGuess} key={i} />
                }
                return (
                    <Row key={i} guess={guess} />
                )
            })}

        </div>
    )
}

export default Grid