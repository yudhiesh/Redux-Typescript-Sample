import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { selectPostById } from "./postsSlice";
import { Link } from "react-router-dom";
import { MatchPropsPost } from "../../types/types";

export const Post = ({ match }: MatchPropsPost) => {
  const { postID } = match.params;
  const post = useSelector((state: RootState) => selectPostById(state, postID));
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
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </Card.Body>
    </Card>
  );
};
