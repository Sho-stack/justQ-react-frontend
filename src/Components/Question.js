import React, { useState } from 'react';
import { Card, Button, Form, Row, Container } from 'react-bootstrap';
import { BsReply } from 'react-icons/bs';
import moment from 'moment';

function Question(props) {
    const question = props.question;
    const timeElapsed = moment(question.timestamp).fromNow();

    const [showReply, setShowReply] = useState(false);
    const toggleReply = () => {
        setShowReply(!showReply);
        setReplyButtonText(showReply ? "Reply" : "Hide");
    };
    const [replyButtonText, setReplyButtonText] = useState("Reply");

    return (
        <Card className={`mb-3 ${props.theme === "light" ? "light-theme" : "dark-theme"}`}>
            <Card.Header>
               <Card.Title>{question.content}
               &nbsp;
               {props.user && question.user_id !== props.user.id && (
                    <Button bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}  size="sm" onClick={toggleReply}>
                        {replyButtonText}&nbsp;
                      < BsReply /> 
                  </Button>
                )}
               </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{question.author} - {timeElapsed}

                </Card.Subtitle>
                {showReply && props.user && question.user_id !== props.user.id && (
            <Row>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            // value={questionText}
                            // onChange={(e) => setQuestionText(e.target.value)}
                        />
                </Form.Group>
                <Container>
                <Card.Subtitle className="mb-2 text-muted">signed {props.user && props.user.username ? props.user.username : "Anonymous"}</Card.Subtitle>
                <Button bg={props.theme} variant={props.theme === 'dark' ? 'outline-secondary' : 'outline-secondary'}  size="sm" onClick={props.openRegistrationModal}>
                    < BsReply /> REPLY
                </Button>
                </Container>

            
            </Row>
                )}
            </Card.Header>

            <Card.Body>
                <small>no replies yet...</small>
            </Card.Body>
            <Card.Footer>
            <Card.Text>{question.net_votes} points</Card.Text>
            </Card.Footer>
        </Card>
    );
}

export default Question;
