import React from "react";
import { Alert, Button, Card } from "react-bootstrap";
import moment from "moment";



function Answer(props) {
    const timeElapsed = moment(props.answer.timestamp).fromNow();
    console.log(props.answer)
    return (

        <Card className={`mb-3 ${props.theme === "light" ? "light-theme" : "dark-theme"}`}>

            <Card.Header>
                <Card.Subtitle>
                <h5>{props.answer.author}:</h5><h6>{props.answer[`content_${props.language}`] || props.answer.content}</h6>
                <Card.Subtitle className="mb-2 text-muted">
                    {timeElapsed}
                </Card.Subtitle>
                </Card.Subtitle>
            </Card.Header>

        </Card>

    );
  }

    export default Answer;