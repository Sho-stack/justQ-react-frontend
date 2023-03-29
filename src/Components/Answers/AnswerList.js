import React, { useState, useEffect } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import Answer from './Answer';
import { BASE_URL } from '../../config.js';

function AnswerList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    const response = await fetch(`${BASE_URL}/questions/${props.questionId}/answers?page=${currentPage}&per_page=${pageSize}`);
    const data = await response.json();

    setTotalPages(data.total_pages);
    setAnswers(data.answers);
  };

  useEffect(() => {
    fetchAnswers();
  }, [currentPage]);

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
      {answers.length ? (
        <>
          {answers.map((answer) => (
            <Answer
              key={answer.id}
              answer={answer}
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
        <p>No replies yet.</p>
      )}
    </Container>
  );
}

export default AnswerList;
