
import { letters } from "../data/words"
import { MdOutlineBackspace } from "react-icons/md"

const Keypad = ({ usedKeys, handleKeyup }) => {

    return (
        <div className="keypad">
            {letters.map((row, i) => (
                <div key={i} className="keypad-row">
                    {
                        row.map((letter) => {
                            const color = usedKeys[letter.key]
                            return (
                                <button onClick={() => handleKeyup({ key: letter.key })} className={`keypad-key ${(letter.key === "Enter" || letter.key === "Backspace") && "wide-key "}${color}`} key={letter.key}>{letter.key === "Backspace" ? <MdOutlineBackspace fontSize={"1.4em"} /> : letter.key}</button>
                            )
                        })
                    }
                </div>
            ))}
        </div>
    )
}

export default Keypad