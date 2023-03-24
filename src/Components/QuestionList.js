import React from 'react';
import { Container } from 'react-bootstrap';
import Question from './Question';

function QuestionList(props) {
  return (
    <Container>
        
      {props.questions.length ? props.questions.map((question) => (
        
        <Question key={question.id} question={question} theme={props.theme} />
      )) : <p>No questions found</p>}
    {console.log("Component re-rendered!")}
    </Container>
  );
}

export default QuestionList;