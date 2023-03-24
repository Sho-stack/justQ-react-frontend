import { Modal, Button, Form } from 'react-bootstrap';
import './../../App.css'
import React, { useState } from 'react';
import { BASE_URL } from './../../config.js';





function AskModal(props) {

    const [questionText, setQuestionText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch(`${BASE_URL}/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: questionText }),
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.error);
                });
            }
            return response.json();
        })
        .then(data => {
            if (!data.error) {
                props.setSuccessText('Your question has been posted!');
                props.setRefreshQuestions(!props.refreshQuestions)
                props.handleClose();
            }
        })
        .catch(error => {
            props.setErrorText(error.message);
            console.error('Error posting question:', error);
        });
    };
    
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            contentClassName={props.theme === "light" ? "light-theme" : "dark-theme"}      
        >
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>What would you like to know?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                    />
                </Form.Group>


            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" bg={props.theme} variant={props.theme} size="lg">
                    ASK
                </Button>
            </Modal.Footer>
        </Form>
        </Modal>
    );
}

export default AskModal;