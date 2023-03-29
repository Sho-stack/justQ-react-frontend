import React, { useState, useEffect } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import Question from './Question';
import { BASE_URL } from '../../config.js';

function QuestionList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); 
  const [totalPages, setTotalPages] = useState(1);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    // Replace this URL with your actual API URL
    const response = await fetch(`${BASE_URL}/questions?page=${currentPage}&per_page=${pageSize}`);
    const data = await response.json();
  
    setTotalPages(Math.ceil(data.total_questions / pageSize));
    setTotalPages(data.total_pages);
    setQuestions(data.questions);
  };

  useEffect(() => {
    fetchQuestions();
  }, [currentPage, props.refreshQuestions]);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Container>
      {questions.length ? (
        <>
          {questions.map((question) => (
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
          ))}
          <Pagination className={`mt-3 justify-content-center ${props.theme}-theme`}>{paginationItems}</Pagination>
        </>
      ) : (
        <p>No questions found</p>
      )}
    </Container>
  );
}

export default QuestionList;