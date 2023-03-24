import React from 'react';
import { Card } from 'react-bootstrap';

function Question(props) {
    return (
        <Card className={`mb-3 ${props.theme === "light" ? "light-theme" : "dark-theme"}`}>
            {console.log('card re-rendered')}

            <Card.Body>
                <Card.Text>{props.question.content}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Question;