import React from "react";
import Answer from "./Answer";

function AnswerList(props) {
  return (<>
      {props.answers.length > 0 ? (
        props.answers.map((answer, index) => (
          <Answer 
          key={index} 
          answer={answer} 
          theme = {props.theme}
          user = {props.user}
          setSuccessText = {props.setSuccessText}
          setErrorText = {props.setErrorText}
          setWarningText = {props.setWarningText}
          language = {props.language}
        />
        ))
      ) : (
        <p>No replies yet.</p>
      )}
  </>);
}

export default AnswerList;