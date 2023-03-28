import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import './../../App.css'
import React, { useState } from 'react';
import { BASE_URL } from './../../config.js';





function AskModal(props) {

    const [questionText, setQuestionText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitting(true);

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
                props.setSuccessText('Your question has been translated!');
                props.setRefreshQuestions(!props.refreshQuestions)
                props.handleClose();
            }
        })
        .catch(error => {
            props.setErrorText(error);
            console.error('Error posting question:', error);
        })
        .finally(() => {
            setSubmitting(false);
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
                        readOnly={submitting}
                    />
                </Form.Group>


            </Modal.Body>
            <Modal.Footer>
            <Button type="submit" bg={props.theme} variant={props.theme} size="lg" disabled={submitting}>
                    {submitting ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span className="ms-2">Translating...</span>
                            </>
                        ) : (
                            'ASK'
                        )}
                </Button>
            </Modal.Footer>
        </Form>
        </Modal>
    );
}

export default AskModal;