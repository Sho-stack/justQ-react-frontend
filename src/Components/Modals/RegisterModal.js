import React from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import {BsArrowLeftCircle} from 'react-icons/bs';
import './../../App.css'

function RegisterModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            contentClassName={props.theme === "light" ? "light-theme" : "dark-theme"}      
        >
            <Modal.Header closeButton>
                <Modal.Title>JustQ / SIGN UP</Modal.Title>
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
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Display name"
                            className="mb-3"
                        >
                            <Form.Control placeholder="" />
                        </FloatingLabel>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                                controlId="floatingInput"
                                label="Password"
                                className="mb-3"
                            >
                            <Form.Control type="password" placeholder="" />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                                controlId="floatingInput"
                                label="Password (the same one)"
                                className="mb-3"
                            >
                            <Form.Control type="password" placeholder="" />
                        </FloatingLabel>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button  bg={props.theme} variant={props.theme} onClick={props.openLoginModal}>
                    <BsArrowLeftCircle />&nbsp;
                    LOGIN
                </Button>
                <Button  bg={props.theme} variant={props.theme} size="lg" onClick={props.handleClose}>
                    SIGN UP
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default RegisterModal;