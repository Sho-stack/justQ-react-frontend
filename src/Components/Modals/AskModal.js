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
                <Modal.Title>What would you like to know?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button  bg={props.theme} variant={props.theme} size="lg" onClick={props.handleClose}>
                    ASK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AskModal;