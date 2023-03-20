import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './../../App.css'
function LoginModal(props) {



    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            contentClassName={props.theme === "light" ? "light-theme" : "dark-theme"}      
        >
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Keep me logged in" />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="outline-dark" type="submit" size="sm" onClick={props.openPasswordResetModal}>
                            Password reset
                        </Button>&nbsp;
                        <Button variant="outline-dark" type="submit" size="sm"onClick={props.openRegistrationModal}>
                            Register
                        </Button>
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

export default LoginModal;