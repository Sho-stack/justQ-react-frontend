import React from "react";
import { Alert, Button, Card } from "react-bootstrap";
import moment from "moment";



function Answer(props) {
    console.log('props:')
    console.log(props)
    const timeElapsed = moment(props.answer.timestamp).fromNow();
  
    return (
        <Card className={`mb-3 ${props.theme === "light" ? "light-theme" : "dark-theme"}`}>

            <Card.Header>
                <Card.Subtitle>
                {props.answer.author}:
                </Card.Subtitle>
            </Card.Header>
            <Card.Body>
            {props.answer.content}
                <Card.Subtitle className="mb-2 text-muted">
                    {timeElapsed}
                </Card.Subtitle>
            </Card.Body>
        </Card>

    );
  }

    export default Answer;