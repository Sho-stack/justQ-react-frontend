import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

function Question(props) {
    const question = props.question;
    const timeElapsed = moment(question.timestamp).fromNow();
    return (
        <Card className={`mb-3 ${props.theme === "light" ? "light-theme" : "dark-theme"}`}>
            <Card.Header>
               <Card.Title>{question.content}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{question.author} - {timeElapsed}</Card.Subtitle>
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
