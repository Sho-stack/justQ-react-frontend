import React, { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { BASE_URL } from '../../config';
import { BsArrowLeftCircle } from 'react-icons/bs';
import './../../App.css'

function NewPassModal(props) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log(props.theme)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
      const response = await fetch(`${BASE_URL}/reset_token/${props.resetToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: newPassword
        })
      });
      const data = await response.json();
      if (data.message) {
        props.setSuccessText(data.message);
        props.handleClose();
      } else {
        // show error message
      }
    } else {
      // show error message    }
    }
  };

  return (
    <Modal 
      show={props.show} 
      onHide={props.handleClose} 
      contentClassName={props.theme === "light" ? "light-theme" : "dark-theme"}      
      >
      <Modal.Header closeButton>
        <Modal.Title>JustQ / SET NEW PASSWORD</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="newPassword">
            <FloatingLabel
                controlId="floatingInput"
                label="new password"
                className="mb-3"
            >
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <FloatingLabel
                  controlId="floatingInput"
                  label="confirm new password"
                  className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FloatingLabel>
          </Form.Group>
          <Modal.Footer>
            <Button variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'} onClick={props.handleClose}>
              <BsArrowLeftCircle />&nbsp;
              Cancel
            </Button>
            <Button type="submit" variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'} size="lg">
              SET NEW PASSWORD
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewPassModal;
