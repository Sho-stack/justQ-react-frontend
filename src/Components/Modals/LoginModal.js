import React from 'react';
import { Modal, Button, Form, Container, FloatingLabel } from 'react-bootstrap';
import { BsSticky, BsPass, BsFillHouseAddFill} from 'react-icons/bs';
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
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Keep me logged in" />
                    </Form.Group>
                    <Form.Group>

                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Container>
                    <Button   bg={props.theme} variant={props.theme} size="sm" onClick={props.openPasswordResetModal}>
                        <BsPass /> reset password
                    </Button>&nbsp;
                    <Button  bg={props.theme} variant={props.theme} size="sm"onClick={props.openRegistrationModal}>
                        < BsFillHouseAddFill /> sign-up
                    </Button>
                </Container>

                <Button  bg={props.theme} variant='success' size="lg" onClick={props.handleClose}>

                    LOG IN
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default LoginModal;