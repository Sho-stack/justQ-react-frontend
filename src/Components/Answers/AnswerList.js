import React, { useState, useEffect } from 'react';
import { Container, Pagination, Button } from 'react-bootstrap';
import Answer from './Answer';
import { BASE_URL } from '../../config.js';

function AnswerList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = () => {
    fetch(`${BASE_URL}/questions/${props.questionId}/answers?page=${currentPage}&per_page=${pageSize}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setTotalPages(data.total_pages);
      setAnswers(data.answers);
    })
    .catch(error => {
      console.error('Error fetching answers:', error);
    });
  };

  useEffect(() => {
    fetchAnswers();
  }, [currentPage, props.refreshAnswers]);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  const [showAnswers, setShowAnswers] = useState(false);
  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  return (
    <>
        <Button onClick={toggleAnswers} className="w-100"  bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'} >
          {showAnswers ? 'Hide answers' : 'Show answers'}
        </Button>
      {showAnswers && (
        <>
          {answers.length ? (
            <>
              {answers.map((answer) => (
                <div style={{ paddingLeft: '5rem' }}>
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
                </div>
              ))}
              <Pagination className={`mt-3 justify-content-center ${props.theme}-theme`}>{paginationItems}</Pagination>
            </>
          ) : (
            <p>No replies yet.</p>
          )}
        </>
      )}
    </>
  );
}

export default AnswerList;