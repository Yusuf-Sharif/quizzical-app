import React from "react"
import StartScreen from "./components/StartScreen.jsx"
import GameScreen from "./components/GameScreen.jsx"
import he from "he";

export default function App() {

const [showStartScreen, setShowStartScreen] = React.useState(true)
// const [showGameScreen, setShowGameScreen] = React.useState(false) <-- not sure if I need this.

const [questionsArray, setQuestionsArray] = React.useState([]) 

const [gameEnded, setGameEnded] = React.useState(false)

const [showGameContainer, setShowGameContainer] = React.useState(false)

console.log("app.jsx loaded")

if (showGameContainer) {
      setTimeout( () => {
      
        // Hide loading screen
        document.getElementsByClassName("loadingio-spinner-eclipse-2j5fqrh0zjt")[0].style.display = "none"
      
        //Show game-screen--container (questions and check answers btn)
        if (document.getElementsByClassName("game-screen--container")[0]) {
          document.getElementsByClassName("game-screen--container")[0].style.display = "block"
        }

        setShowGameContainer(false)

        // Showing coloured blobs
        document.getElementsByClassName("game-screen--blob-blue")[0].style.display = "block"
        document.getElementsByClassName("game-screen--blob-yellow")[0].style.display = "block"
        
      }, 700)
}


// Fetching questions from API and updating questionsArray
function fetchQuestions() {

  // Making 'check answers' button look disabled again
  if (document.getElementsByClassName("game-screen--check-answers-btn")[0]) {
    document.getElementsByClassName("game-screen--check-answers-btn")[0].style.opacity = "0.65"
    document.getElementsByClassName("game-screen--check-answers-btn")[0].style.cursor = "not-allowed"
  }


  // After 'play again' clicked, Hiding coloured blobs
  if (document.getElementsByClassName("game-screen--blob-blue")[0]) {
    document.getElementsByClassName("game-screen--blob-blue")[0].style.display = "none"
    document.getElementsByClassName("game-screen--blob-yellow")[0].style.display = "none"
  }
  
  // Show loading screen
  document.getElementsByClassName("loadingio-spinner-eclipse-2j5fqrh0zjt")[0].style.display = "block"
  
  fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
  .then( response => response.json() )
  .then( data => {

    const newArray = data.results.map( (question, index) => {

      const encodedAnswers = [question.correct_answer, ...question.incorrect_answers]

      const decodedAnswers = encodedAnswers.map( answer => {
        return he.decode(answer)
      })
      
      const randomisedAnswers = []
      
      const randomNum = () => Math.floor(Math.random() * 4)

      // Pushing each item from decodedAnswers array to randomisedArray at a random index
        for (let i = 0; i < 4; i++) {
          randomisedAnswers.splice(randomNum(), 0, decodedAnswers[i])
        }    

      return {
        id: index,
        question: he.decode(question.question),
        answers: randomisedAnswers,
        selectedAnswer: "",
        correctAnswer: question.correct_answer,
        displayAnswers: false,
      }
    })
    
      setQuestionsArray(newArray)

      setShowGameContainer(true)
})


  

}

  return (
    <>
    <div className="loadingio-spinner-eclipse-2j5fqrh0zjt">
      <div className="ldio-h5jcugktxxd">
        <div></div>
      </div>
    </div>

    { showStartScreen ? 
      <StartScreen 
        setShowStartScreen={setShowStartScreen}
        fetchQuestions={fetchQuestions}
      />
      :
      <GameScreen 
        questionsArray={questionsArray}
        setQuestionsArray={setQuestionsArray}
        fetchQuestions={fetchQuestions}
        gameEnded={gameEnded}
        setGameEnded={setGameEnded}
      />
    }
    </>
  )
  }




