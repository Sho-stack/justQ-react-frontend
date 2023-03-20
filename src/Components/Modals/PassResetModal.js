import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './../../App.css'
function PassResetModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            contentClassName={props.theme === "light" ? "light-theme" : "dark-theme"}      
        >
            <Modal.Header closeButton>
                <Modal.Title>Enter Your email address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button  bg={props.theme} variant={props.theme}  onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button  bg={props.theme} variant={props.theme}  onClick={props.handleClose}>
                    Send Password Reset
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default PassResetModal;