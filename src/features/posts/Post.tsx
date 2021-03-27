import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { InitialState } from "./postsSlice";
import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  postID: string;
}

export interface MatchProps extends RouteComponentProps<MatchParams> {}

export const Post = ({ match }: MatchProps) => {
  const { postID } = match.params;
  console.log("HI");
  const post = useSelector((state: RootState) =>
    state.posts.find((post: InitialState) => post.id === postID)
  );
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <Card
      bg="Primary"
      key={post.id}
      text="dark"
      style={{ width: "18rem" }}
      className="mb-2"
    >
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};
