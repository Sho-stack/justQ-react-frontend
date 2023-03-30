import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import moment from "moment";
import { BASE_URL } from "../../config.js";

function Answer(props) {
  const timeElapsed = moment(props.answer.timestamp).fromNow();
  const [upvoted, setUpvoted] = useState(props.answer.user_vote === 1);
  const [downvoted, setDownvoted] = useState(props.answer.user_vote === -1);
  const [netVotes, setNetVotes] = useState(props.answer.net_votes);

  const toggleUpvote = () => {
    if (downvoted) setDownvoted(false);
    const newVoteValue = upvoted ? 0 : 1;

    fetch(`${BASE_URL}/vote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer_id: props.answer.id,
        vote: newVoteValue,
      }),
      credentials: "include",
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
          setUpvoted(!upvoted);
          setNetVotes(netVotes + (newVoteValue === 1 ? 1 : -1));
          props.fetchAnswers();
        }
      })
      .catch((error) => {
        console.error("Error updating vote:", error);
      });
  };

  const toggleDownvote = () => {
    if (upvoted) setUpvoted(false);
    const newVoteValue = downvoted ? 0 : -1;

    fetch(`${BASE_URL}/vote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer_id: props.answer.id,
        vote: newVoteValue,
      }),
      credentials: "include",
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
          setDownvoted(!downvoted);
          setNetVotes(netVotes + (newVoteValue === -1 ? -1 : 1));
          props.fetchAnswers();
        }
      })
      .catch((error) => {
        console.error("Error updating vote:", error);
      });
  };

  return (
    <>
      <Card
        className={`${
          props.theme === "light" ? "light-theme" : "dark-theme"
        }`}
      >
        <Card.Header>
        {props.user && props.answer.user_id === props.user.id ? "Your reply: " : "A: "} {props.answer[`content_${props.language}`] || props.answer.content}
          <Card.Subtitle className="mb-2 text-muted">
            {props.answer.author} - {timeElapsed}
          </Card.Subtitle>
          {props.user && (
            <>
              {netVotes} points
              {props.user && props.answer.user_id !== props.user.id && (
                <>
                  <Button
                    bg={props.theme}
                    variant={
                      props.theme === "dark" ? "outline-light" : "outline-dark"
                    }
                    size="sm"
                    onClick={toggleUpvote}
                    active={upvoted}
                    className="ms-2"
                  >
                    +1
                  </Button>
                  <Button
                    bg={props.theme}
                    variant={
                      props.theme === "dark" ? "outline-light" : "outline-dark"
                    }
                    size="sm"
                    onClick={toggleDownvote}
                    active={downvoted}
                    className="ms-2"
                  >
                    -1
                  </Button>
                </>
              )}
            </>
          )}
        </Card.Header>
      </Card>
    </>
  );
}

export default Answer;
