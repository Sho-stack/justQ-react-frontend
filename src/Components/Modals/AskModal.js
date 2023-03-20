import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './../../App.css'
function AskModal(props) {

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            contentClassName={props.theme === "light" ? "light-theme" : "dark-theme"}      
        >
            <Modal.Header closeButton>
                <Modal.Title>Ask a Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Your Question</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button  bg={props.theme} variant={props.theme}  onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button  bg={props.theme} variant={props.theme}  onClick={props.handleClose}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default AskModal;