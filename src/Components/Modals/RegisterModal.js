import React, {useState} from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import {BsArrowLeftCircle} from 'react-icons/bs';
import './../../App.css'

function RegisterModal(props) {


    const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
    });

    const handleChange = (event) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
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
            if(!data.error) {
            props.setSuccessText(data.message);
            props.openLoginModal();
            }
        })
        .catch(error => {
            props.setErrorText(error.message);
            console.error('Error fetching data:', error);
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
                    <Modal.Title>JustQ / SIGN UP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="email address"
                                className="mb-3"
                            >
                            <Form.Control
                            type="email"
                            name="email"
                            placeholder=""
                            autoFocus
                            onChange={handleChange}
                            />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="username"
                                className="mb-3"
                            >
                                <Form.Control
                                name="username"
                                placeholder=""
                                onChange={handleChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="password"
                                className="mb-3"
                            >
                                <Form.Control
                                type="password"
                                name="password"
                                placeholder=""
                                onChange={handleChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="password (the same one)"
                                className="mb-3"
                            >
                                <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder=""
                                onChange={handleChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button  bg={props.theme} variant={props.theme} onClick={props.openLoginModal}>
                        <BsArrowLeftCircle />&nbsp;
                        LOGIN
                    </Button>
                    <Button  type="submit" bg={props.theme} variant={props.theme} size="lg">
                        SIGN UP
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>

    );

}

export default RegisterModal;