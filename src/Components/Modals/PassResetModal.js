import React, {useState} from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import {BsArrowLeftCircle} from 'react-icons/bs';
import './../../App.css'
import { BASE_URL } from '../../config.js';



function PassResetModal(props) {

    const [email, setEmail] = useState('');

    const handleChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      fetch(`${BASE_URL}/reset_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.error);
            });
          }
          return response.json();
        })
        .then((data) => {
          if (!data.error) {
            props.setSuccessText(data.message);
            props.handleClose();
          }
        })
        .catch((error) => {
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
                <Modal.Title>JustQ / PASSWORD RESET</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               
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
                <Button  bg={props.theme} variant={props.theme} size="lg" type="submit">
                    RESET
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    );

}

export default PassResetModal;