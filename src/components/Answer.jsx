import React from "react"

export default function Anwser(props) {

    const [localQuestionsArray, setLocalQuestionsArray] = React.useState(props.questionsArray)

    // OnClick Setter function:
        // sets questionsArray[questionIndex].selectedAnswer's value to this Answer's text.
    function handleClick() {

        // create a new array,

        const newArray = props.questionsArray    
        
        // create a new object
            // saving this question object in
            // set selectedAnswer value to props.answer

        const updatedQuestionObj = {
            ...props.questionObj,
            selectedAnswer: props.answer
        }
        
        // delete this questionObject from newArray using id
        newArray.splice(props.questionIndex, 1)

        // push new object to mewArray at index of id
        newArray.splice(props.questionIndex, 0, updatedQuestionObj)


        // setQuestionsArray to newArray
        props.setQuestionsArray(newArray)

        // update clickedButtonIndex state in Question Component
        props.setClickedButtonIndex(props.id)


        // if all questions answered, enable 'check answers button'
        const counterArray = props.questionsArray.filter( question => {
            return question.selectedAnswer
        })

        if (counterArray.length === props.questionsArray.length) {
            document.getElementsByClassName("game-screen--check-answers-btn")[0].style.opacity = "1"
            document.getElementsByClassName("game-screen--check-answers-btn")[0].style.cursor = "pointer"
        }

    }

    // Highlighting correct answers and incorrect answers that were selected.
    // And if button clicked, changing background to look 'selected'
        const styles = props.questionObj.displayAnswers === true ? {
            
            backgroundColor: props.answer === props.questionObj.correctAnswer ? "#94D7A2"
            : props.answer === props.questionObj.selectedAnswer ? "#F8BCBC"
            : "",
            
            color: props.answer !== props.questionObj.correctAnswer ? "#6876b6"
            : "",
            
            border: props.answer === props.questionObj.correctAnswer ? "none"
            : props.answer === props.questionObj.selectedAnswer ? "none" 
            : "1px solid #4D5B9E",

            marginRight: "2px"

        } : props.id === props.clickedButtonIndex ? {
            background: "#D6DBF5",
            border: "none",
            marginRight: "2px"
        } : {}
       

    return (
        <div onClick={handleClick} style={styles} className="answer--container">
            <p>{props.answer}</p>
        </div>
    )
}