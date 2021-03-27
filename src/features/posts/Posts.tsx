import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import { InitialState } from "./postsSlice";

export const PostsList = () => {
  const posts = useSelector((state: RootState) => state.posts);

  const renderedPosts = posts?.map((post: InitialState) => (
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
        <Link to={`/posts/${post.id}`}>View Post</Link>
      </Card.Body>
    </Card>
  ));

  return (
    <div>
      <h1>Posts</h1>
      {renderedPosts}
    </div>
  );
};
