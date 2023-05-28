import React from "react"
import blobBlue from "../assets/blob-blue.png"
import blobYellow from "../assets/blob-yellow.png"

export default function StartScreen(props) {

    function handleClick() {
        // Hide StartScreen to render GameScreen
        props.setShowStartScreen(false)
        props.fetchQuestions()
    }



    return (
        <div className="start-screen--wrapper">
            <div className="start-screen--container">
                <h1 className="start-screen--title">Quizzical</h1>
                <p className="start-screen--p">Trivia Game</p>
                <button onClick={handleClick} className="btn start-screen--btn">Start Quiz</button>
            </div>
            <img src={blobBlue} alt="blue blob" className="start-screen--blob-blue" />
            <img src={blobYellow} alt="yellow blob" className="start-screen--blob-yellow" />
        </div>
    )
}