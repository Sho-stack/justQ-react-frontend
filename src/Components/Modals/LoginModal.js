import React, { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { BsUnlock, BsTerminal } from 'react-icons/bs';
import { MdLogin }  from 'react-icons/md';
import './../../App.css'
import { BASE_URL } from './../../config.js';

function LoginModal(props) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({
          ...formData,
          [event.target.name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
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
                props.setSuccessText(data.message);
                props.setUser(data.user);
                props.handleClose();
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
            <Modal.Header closeButton>
                <Modal.Title>JustQ / LOGIN</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <FloatingLabel

                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoFocus
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="&nbsp;Stay logged in" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Button bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'} size="sm" onClick={props.openPasswordResetModal}>
                            <BsUnlock /> forgot password?
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button  bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'} size="lg" onClick={handleSubmit}>
                     LOGIN&nbsp;< MdLogin />
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default LoginModal;