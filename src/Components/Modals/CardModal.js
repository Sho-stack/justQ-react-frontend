import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './../../App.css';

function CardModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      contentClassName={props.theme === 'light' ? 'light-theme' : 'dark-theme'}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="question">
          <h4>{props.question}</h4>
        </div>
        <div className="author">
          <p>{props.author}</p>
        </div>
        <div className="voting">
          <Button variant="outline-danger" onClick={props.handleDownvote}>Downvote</Button>{' '}
          <Button variant="outline-success" onClick={props.handleUpvote}>Upvote</Button>{' '}
        </div>
        <div className="replies">
          <Button variant="outline-info" onClick={props.handleReplies}>See more replies</Button>{' '}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardModal;
