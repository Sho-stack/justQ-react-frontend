import React from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import {BsArrowLeftCircle, BsSticky} from 'react-icons/bs';
import './../../App.css'
function PassResetModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            contentClassName={props.theme === "light" ? "light-theme" : "dark-theme"}      
        >
            <Modal.Header closeButton>
                <Modal.Title>JustQ / PASSWORD RESET</Modal.Title>
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button  bg={props.theme} variant={props.theme} onClick={props.openLoginModal}>
                    <BsArrowLeftCircle />&nbsp;
                    LOGIN
                </Button>
                <Button  bg={props.theme} variant='success' size="lg" onClick={props.handleClose}>
                    RESET
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default PassResetModal;