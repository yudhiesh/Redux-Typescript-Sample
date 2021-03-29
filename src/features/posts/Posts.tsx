import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import { InitialStateUser } from "./postsSlice";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";

export const PostsList = () => {
  const posts = useSelector((state: RootState) => state.posts);

  return (
    <div>
      <h1>Posts</h1>
      {posts?.map((post: InitialStateUser) => {
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
              <PostAuthor userID={post.userID} />
              <br />
              <Link to={`/posts/${post.id}`}>View Post</Link>
              <br />
              <TimeAgo timestamp={post.date} />
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};
