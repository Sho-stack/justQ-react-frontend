import React from 'react';
import { Container } from 'react-bootstrap';
import Question from './Question';

function QuestionList(props) {
  return (
    <Container>
      {console.log(props.questions)}
      {props.questions.length ? props.questions.map((question) => (
        <Question 
        key={question.id} 
        question={question} 
        theme={props.theme} 
        user={props.user}
        setSuccessText={props.setSuccessText}
        setWarningText={props.setWarningText}
        setErrorText={props.setErrorText}
      />
      )) : <p>No questions found</p>}
    </Container>
  );
}

export default QuestionList;
