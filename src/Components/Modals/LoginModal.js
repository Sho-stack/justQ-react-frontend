import React from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { BsUnlock, BsTerminal } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';
import { MdLogin }  from 'react-icons/md';
import './../../App.css'

function LoginModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            contentClassName={props.theme === "light" ? "light-theme" : "dark-theme"}      
        >
            <Modal.Header closeButton>
                <Modal.Title>JustQ / LOGIN</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                placeholder=""
                                autoFocus
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <Button    variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'} size="sm" onClick={props.openPasswordResetModal}>
                            <BsUnlock /> forgot password?
                        </Button>&nbsp;
                        <Button bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}  size="sm" onClick={props.openRegistrationModal}>
                            < BsTerminal /> sign-up
                        </Button>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        &nbsp;<Form.Check type="checkbox" label="&nbsp;Stay logged in" />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button  bg={props.theme} variant={props.theme} size="lg" onClick={props.handleClose}>
                     LOGIN&nbsp;< MdLogin />
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default LoginModal;