import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts, selectAllPosts } from "./postsSlice";
import { RootState } from "../../app/store";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);
  let content;

  if (postStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => (
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
          <ReactionButtons post={post} />
        </Card.Body>
      </Card>
    ));
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {content}
    </div>
  );
};
