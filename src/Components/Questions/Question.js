import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Container, Spinner } from 'react-bootstrap';
import { BsReply } from 'react-icons/bs';
import moment from 'moment';
import { BASE_URL } from '../../config.js';
import AnswerList from '../Answers/AnswerList.js';
import { FaThumbsUp } from 'react-icons/fa';

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


    const [submittingReply, setSubmittingReply] = useState(false);
    const [answersUpdated, setAnswersUpdated] = useState(false);
    const refreshAnswers = () => {
        setAnswersUpdated(!answersUpdated);
    };
    const submitAnswer = () => {
        setSubmittingReply(true);

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
                toggleReply();
            }
        })
        .catch(error => {
            props.setErrorText(error.message);
            console.error('Error posting answer:', error.message);
        })
        .finally(() => {
        setSubmittingReply(false)
        refreshAnswers();
        });
    };

    const [upvoted, setUpvoted] = useState(question.user_vote === 1);
    const [netVotes, setNetVotes] = useState(question.net_votes);

    const toggleUpvote = () => {
        const newVoteValue = upvoted ? 0 : 1;
    
        fetch(`${BASE_URL}/vote`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                question_id: question.id, 
                vote: newVoteValue 
            }),
            credentials: 'include',
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
                setUpvoted(!upvoted);
                setNetVotes(netVotes + (newVoteValue === 1 ? 1 : -1));
            }
        })
        .catch(error => {
            console.error('Error updating vote:', error);
        });
};


    return (
        <Card className={`mb-3 ${props.theme === "light" ? "light-theme" : "dark-theme"}`}>
            <Card.Header>
               <Card.Title>Q: {props.question[`content_${props.language}`] || props.question.content}
               &nbsp;
               {props.user && question.user_id !== props.user.id && (<>
                    <Button bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}  size="sm" onClick={toggleReply}>
                        {replyButtonText}&nbsp;
                    
                    </Button>
                    &nbsp;
                    <Button  bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'} size="sm" onClick={toggleUpvote } active={upvoted}>
                       <FaThumbsUp />
                    </Button>
                    </>)}
               </Card.Title>
               <Card.Subtitle className="mb-2 text-muted">
                {question.author} - {timeElapsed}
                </Card.Subtitle>

                {showReply && props.user && question.user_id !== props.user.id && (
                <Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            readOnly={submittingReply}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                </Form.Group>
                <Container>
                <Card.Subtitle className="mb-2 text-muted">signed {props.user && props.user.username ? props.user.username : "Anonymous"}</Card.Subtitle>
                <Button  bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'} size="sm" onClick={submitAnswer} disabled={submittingReply}>
                    {submittingReply ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span className="ms-2">Translating...</span>
                        </>
                    ) : (
                        <>
                            <BsReply /> REPLY
                        </>
                    )}
                </Button>

                </Container>

            
            </Row>
                )}
            </Card.Header>

            <Card.Body style={{ padding: '0px' }}>
                <AnswerList 
                    questionId={question.id}
                    theme = {props.theme}
                    user = {props.user}
                    setSuccessText = {props.setSuccessText}
                    setErrorText = {props.setErrorText}
                    setWarningText = {props.setWarningText}
                    language = {props.language}
                    refreshAnswers = {refreshAnswers}
                />

            </Card.Body>
            <Card.Footer>
            <Card.Text>{netVotes} points</Card.Text>
            </Card.Footer>
        </Card>
    );
}

export default Question;
