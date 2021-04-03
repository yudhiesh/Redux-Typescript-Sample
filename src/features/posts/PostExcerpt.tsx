import React from "react";
import { Card } from "react-bootstrap";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../app/store";
import { selectPostById } from "./postsSlice";
import { TimeAgo } from "./TimeAgo";
import { PostExcerptProps } from "../../types/types";

export const PostExcerpt = ({ postId }: PostExcerptProps) => {
  const post = useTypedSelector((state) => selectPostById(state, postId));
  return post ? (
    <Card
      bg="Primary"
      key={postId}
      text="dark"
      style={{ width: "18rem" }}
      className="mb-2"
    >
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        <PostAuthor userID={post.user} />
        <br />
        <Link to={`/posts/${post.id}`}>View Post</Link>
        <br />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </Card.Body>
    </Card>
  ) : (
    <>
      <h1>No Posts Available </h1>
    </>
  );
};
