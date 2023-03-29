import React from "react";
import { Alert, Button, Card } from "react-bootstrap";
import moment from "moment";



function Answer(props) {
    const timeElapsed = moment(props.answer.timestamp).fromNow();
    console.log(props.answer)
    return (<>

            <Card.Header>
                A: {props.answer[`content_${props.language}`] || props.answer.content}
                <Card.Subtitle>
                    {props.answer.author} - {timeElapsed}
                </Card.Subtitle>
            </Card.Header>

        </>  );
  }

    export default Answer;