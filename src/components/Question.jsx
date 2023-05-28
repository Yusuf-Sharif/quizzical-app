import React from "react"
import Answer from "./Answer.jsx"

export default function Question(props) {
    
    const [clickedButtonIndex, setClickedButtonIndex] = React.useState(null)
    

    React.useEffect( () => {
        setClickedButtonIndex(null)
    }, [props.questionsArray])

    const answerElements = props.questionObj.answers.map( 
        (answer, index) =>
            <Answer 
                key={index}
                id={index}
                clickedButtonIndex={clickedButtonIndex}
                setClickedButtonIndex={setClickedButtonIndex}
                questionIndex={props.questionIndex}
                answer={answer}
                questionObj={props.questionObj}
                questionsArray={props.questionsArray}
                setQuestionsArray={props.setQuestionsArray}
                
            />
        )

    return (
        <div className="question--wrapper">
            <h3 className="question--question">{props.questionObj.question}</h3>
            <div className="question--answers-container">
                {answerElements}
            </div>
            <hr />
        </div>
    )
}