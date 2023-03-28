import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Container } from 'react-bootstrap';
import { BsReply } from 'react-icons/bs';
import moment from 'moment';
import { BASE_URL } from '../../config.js';
import AnswerList from '../Answers/AnswerList.js';

function Question(props) {
    const question = props.question;
    const timeElapsed = moment(question.timestamp).fromNow();

    const [showReply, setShowReply] = useState(false);
    const [replyText, setReplyText] = useState('');
    const toggleReply = () => {
        setShowReply(!showReply);
        setReplyButtonText(showReply ? "Reply" : "Hide");
    };
    const [replyButtonText, setReplyButtonText] = useState("Reply");

    const [answers, setAnswers] = useState([]);
    useEffect(() => {

      fetch(`${BASE_URL}/questions/${question.id}/answers`, {
        credentials: 'include'
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(error => {
              throw new Error(error.message);
            });
          }
          return response.json();
        })
        .then(data => {
          setAnswers(data.answers);
        })
        .catch(error => {
          console.error('Error fetching answers:', error);
        });
                // eslint-disable-next-line
    }, []);

    const submitAnswer = () => {

        fetch(`${BASE_URL}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: replyText, question_id: question.id }),
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            return response.json();
        })
        .then(data => {
            if (!data.error) {
                props.setSuccessText('Your answer has been posted!');
                setAnswers([...answers, data.answer])
                toggleReply();
            }
        })
        .catch(error => {
            props.setErrorText(error.message);
            console.error('Error posting answer:', error.message);
        });
    };

    const getContentTranslation = () => {
        const translations = {
          'en': question.content_en,
          'pl': question.content_pl,
          'es': question.content_es,
          'zh-CN': question.content_zh,
          'hi': question.content_hi,
          'ar': question.content_ar,
          'pt': question.content_pt,
          'bn': question.content_bn,
          'ru': question.content_ru,
          'ja': question.content_ja,
          'pa': question.content_pa
        };
    
        const translation = translations[props.language];
        return translation === null || translation === '' ? question.content : translation;
    };

    return (
        <Card className={`mb-3 ${props.theme === "light" ? "light-theme" : "dark-theme"}`}>
            <Card.Header>
               <Card.Title>{getContentTranslation()}
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
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                </Form.Group>
                <Container>
                <Card.Subtitle className="mb-2 text-muted">signed {props.user && props.user.username ? props.user.username : "Anonymous"}</Card.Subtitle>
                <Button bg={props.theme} variant={props.theme === 'dark' ? 'outline-secondary' : 'outline-secondary'}  size="sm" onClick={submitAnswer}>
                    < BsReply /> REPLY
                </Button>
                </Container>

            
            </Row>
                )}
            </Card.Header>

            <Card.Body>
            {answers.length > 0 ? (
                <AnswerList 
                answers={answers}
                theme = {props.theme}
                user = {props.user}
                setSuccessText = {props.setSuccessText}
                setErrorText = {props.setErrorText}
                setWarningText = {props.setWarningText}
                />
            ) : (
                <small>no replies yet...</small>
            )}
            </Card.Body>
            <Card.Footer>
            <Card.Text>{question.net_votes} points</Card.Text>
            </Card.Footer>
        </Card>
    );
}

export default Question;
