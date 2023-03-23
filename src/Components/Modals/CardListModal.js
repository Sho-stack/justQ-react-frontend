import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CardModal from './CardModal';
import data from '../../data/cards.json';
import './../../App.css';

function CardListModal() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState(data.cards);

  const handleUpvote = (id) => {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        card.upvotes += 1;
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleDownvote = (id) => {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        card.downvotes += 1;
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleReplies = (id) => {
    const selected = cards.find((card) => card.id === id);
    setSelectedCard(selected);
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const renderCards = () => {
    return cards.map((card) => (
      <div key={card.id}>
        <div className="question">
          <h4>{card.question}</h4>
        </div>
        <div className="author">
          <p>{card.author}</p>
        </div>
        <div className="voting">
          <Button variant="outline-danger" onClick={() => handleDownvote(card.id)}>
            Downvote ({card.downvotes})
          </Button>{' '}
          <Button variant="outline-success" onClick={() => handleUpvote(card.id)}>
            Upvote ({card.upvotes})
          </Button>{' '}
        </div>
        <div className="replies">
          <Button variant="outline-info" onClick={() => handleReplies(card.id)}>
            See more replies
          </Button>{' '}
        </div>
      </div>
    ));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Card List</h1>
          {renderCards()}
        </Col>
      </Row>
      <CardModal
        show={modalShow}
        handleClose={handleClose}
        title={selectedCard.title}
        question={selectedCard.question}
        author={selectedCard.author}
        upvotes={selectedCard.upvotes}
        downvotes={selectedCard.downvotes}
        theme={'light'}
        handleUpvote={() => handleUpvote(selectedCard.id)}
        handleDownvote={() => handleDownvote(selectedCard.id)}
        handleReplies={() => handleReplies(selectedCard.id)}
      />
    </Container>
  );
}

export default CardList;
