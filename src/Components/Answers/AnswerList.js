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
    fetch(
      `${BASE_URL}/questions/${props.question.id}/answers?page=${currentPage}&per_page=${pageSize}${
        props.sortBy ? `&sort_by=${props.sortBy}` : ""
      }${props.order ? `&order=${props.order}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalPages(data.total_pages);
        setAnswers(data.answers);
      })
      .catch((error) => {
        console.error("Error fetching answers:", error);
      });
  };

  useEffect(() => {
    fetchAnswers();
  }, [currentPage, props.refreshAnswers]);

  const paginationItems = [];

  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
        className={number === currentPage ? 'active' : ''}
      >
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

    {showAnswers ? '' : 
      <>
        <br />
        <div className="d-flex justify-content-center">
          <Button onClick={toggleAnswers} className="mx-auto"  bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'} >
            Show {props.question.num_answers} answers
          </Button>
        </div>
        <br />
      </>
    }




      {showAnswers && (
        <>
          {answers && answers.length ? (
              <div style={{ paddingLeft: '5rem' }}>

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
                    fetchAnswers={fetchAnswers}
                  />
                ))}
              
              <Pagination className={`mt-3 justify-content-center ${props.theme}-theme`}>{paginationItems}</Pagination>
              </div>
          ) : (
            <p>No replies yet.</p>
          )}
        </>
      )}
    </>
  );
}

export default AnswerList;