import React from 'react';
import { Container } from 'react-bootstrap';
import Question from './Question';

function QuestionList(props) {
  return (
    <Container>
      {props.questions.length ? props.questions.map((question) => (
        <Question 
        key={question.id} 
        question={question} 
        theme={props.theme} 
        user={props.user}
        setSuccessText={props.setSuccessText}
        setWarningText={props.setWarningText}
        setErrorText={props.setErrorText}
        language={props.language}
      />
      )) : <p>No questions found</p>}
    </Container>
  );
}

export default QuestionList;
