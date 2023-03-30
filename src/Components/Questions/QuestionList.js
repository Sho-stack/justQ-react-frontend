import React, { useState, useEffect } from 'react';
import { Container, Pagination, ButtonGroup, Button } from 'react-bootstrap';
import Question from './Question';
import { BASE_URL } from '../../config.js';

function QuestionList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [sortBy, setSortBy] = useState('timestamp');
  const [order, setOrder] = useState('desc');
  const [answerSortBy, setAnswerSortBy] = useState('timestamp');
  const [answerOrder, setAnswerOrder] = useState('desc');


  const fetchQuestions = () => {
    fetch(
      `${BASE_URL}/questions?page=${currentPage}&per_page=${pageSize}&sort_by=${sortBy}&order=${order}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ', data);
        setTotalPages(data.total_pages);
        setQuestions(data.questions);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  };

  useEffect(() => {

    const savedSortBy = localStorage.getItem('sortBy');
    const savedOrder = localStorage.getItem('order');
    if (savedSortBy) setSortBy(savedSortBy);
    if (savedOrder) setOrder(savedOrder);

    fetchQuestions();
  }, [currentPage, props.refreshQuestions, sortBy, order]);

  const handleSortByChange = (value) => {
    setSortBy(value);
    localStorage.setItem('sortBy', value);
  };

  const handleOrderChange = (value) => {
    setOrder(value);
    localStorage.setItem('order', value);
  };

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Container>

      <div className="d-flex justify-content-center align-items-center mb-2 text-center">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          Sort By:
         <ButtonGroup>
          <Button
            bg={props.theme}
            variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}
            active={sortBy === 'timestamp'}
            onClick={() => handleSortByChange('timestamp')}
          >
            Date
          </Button>
          <Button
            bg={props.theme}
            variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}
            active={sortBy === 'total_score'}
            onClick={() => handleSortByChange('total_score')}
          >
            Popularity
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button
            bg={props.theme}
            variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}
            active={order === 'asc'}
            onClick={() => handleOrderChange('asc')}
          >
            {sortBy === 'timestamp' ? 'From Oldest' : 'Ascending'}
          </Button>
          <Button
            bg={props.theme}
            variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}
            active={order === 'desc'}
            onClick={() => handleOrderChange('desc')}
          >
            {sortBy === 'timestamp' ? 'From Newest' : 'Descending'}
          </Button>
        </ButtonGroup>
        </div>
      </div>


      <br></br>
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
              sortBy={answerSortBy}
              order={answerOrder}
            />
          ))}
          <Pagination
            className={`mt-3 justify-content-center ${props.theme}-theme`}
          >
            {paginationItems}
          </Pagination>
        </>
      ) : (
        <p>No questions found</p>
      )}
    </Container>
  );
}

export default QuestionList;
