import React from "react"
import Question from "./Question.jsx"
import blobBlue from "../assets/blob-blue.png"
import blobYellow from "../assets/blob-yellow.png"
import gifLoading from "../assets/ring-loading.gif"

export default function GameScreen(props)  {

    const [userScore, setUserScore] = React.useState(0)

    const [answerClicked, setAnswerClicked] = React.useState(0)

    const questionElements = props.questionsArray.map( 
            (question, index) => 
            <Question 
                key={index} 
                questionIndex={index} 
                questionObj={props.questionsArray[index]}
                questionsArray={props.questionsArray}
                setQuestionsArray={props.setQuestionsArray}
            /> 
        )            

        

        

        

        function checkAnswers() {
                
            const counterArray = props.questionsArray.filter( question => {
                return question.selectedAnswer
            })

                // Before displaying results, check that all questions are answered
                if (counterArray.length === props.questionsArray.length) {
                    
                    // If game hasnt ended, then show answers
                    if (!props.gameEnded) {
                        props.setGameEnded(true)

                        // Finding out the number of correct answers
                        const totalCorrectAnswers = props.questionsArray.filter( question => {
                            return question.selectedAnswer === question.correctAnswer
                        })
            
                        setUserScore(totalCorrectAnswers.length)
            
                        // Display userScore on screen
                        document.getElementsByClassName("game-screen--score-number")[0].style.display = "inline"
            
            
            
                        // Updating questionsArray to set displayAnswers property to true
                        const newArray = props.questionsArray.map( question => {
                            return {
                                ...question, 
                                displayAnswers: true
                            }
                        })
            
                        props.setQuestionsArray(newArray)

                    }
            
                // If game has ended, (and button clicked), then fetch more questions
                else {
                    props.fetchQuestions()
                    // Hide userScore
                    document.getElementsByClassName("game-screen--score-number")[0].style.display = "none"
                    props.setGameEnded(false)

                    // Hide game-screen--container (questions and check answers btn)
                    document.getElementsByClassName("game-screen--container")[0].style.display = "none"
                }
        }

        }



    return (
        <div className="game-screen--wrapper"> 
            {/* <img src={gifLoading} alt="gif loading" /> */}

            

            <div className="game-screen--container">
                <div className="game-screen--questions-container">
                    {questionElements}
                </div>

                <div className="game-screen--btn-container">
                    
                    <span className="game-screen--score-number">
                        {userScore} / 5 answers correct
                    </span>

                    <button onClick={checkAnswers} className="btn game-screen--check-answers-btn">
                        {props.gameEnded === false ? "Check Answers" : "Play Again"}
                    </button> 
                    
                </div>
            </div>  
            <img src={blobBlue} alt="blue blob" className="game-screen--blob-blue" />
            <img src={blobYellow} alt="yellow blob" className="game-screen--blob-yellow" />
        </div>
    )
}