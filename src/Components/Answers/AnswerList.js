import React from "react";
import Answer from "./Answer";

function AnswerList(props) {
  return (<>
      {props.answers.length > 0 ? (
        props.answers.map((answer) => (
          <Answer 
          key={answer.id} 
          answer={answer} 
          theme = {props.theme}
          user = {props.user}
          setSuccessText = {props.setSuccessText}
          setErrorText = {props.setErrorText}
          setWarningText = {props.setWarningText}
        />
        ))
      ) : (
        <p>No replies yet.</p>
      )}
  </>);
}

export default AnswerList;