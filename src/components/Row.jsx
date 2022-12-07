import { motion } from "framer-motion"
const box = {
    visible: {
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
}
const item = {
    hidden: {
        rotateX: 0
    },
    visible: {
        rotateX: 360,
        transition: {
            duration: .5
        }
    }
}
const Row = ({ guess, currentGuess }) => {

    if (guess) {
        return (
            <motion.div
                className="row"
                initial="hidden"
                animate="visible"
                variants={box}
            >
                {guess.map((letter, i) => (
                    <motion.div variants={item} key={i} className={`row-item ${letter.color}`}>{letter.key}</motion.div>
                ))}

            </motion.div>
        )
    }

    if (currentGuess) {
        let letters = currentGuess.split("")

        return (
            <div className='row'>
                {letters.map((letter, i) => (
                    <motion.div key={i} className="filled row-item" animate={{ boxShadow: "0px 0px 7px 0px rgba(255,255,255,0.82)", scale: [1, 1.1, 1] }} transition={{ duration: .2 }}>{letter}</motion.div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div className="row-item" key={i}></div>
                ))}
            </div>
        )
    }
    return (
        <div className='row'>
            <div className=" row-item"></div>
            <div className=" row-item"></div>
            <div className=" row-item"></div>
            <div className=" row-item"></div>
            <div className=" row-item"></div>

        </div>
    )
}

export default Row