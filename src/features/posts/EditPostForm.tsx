import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useHistory } from "react-router-dom";
import { postUpdate } from "./postsSlice";
import { MatchProps } from "./Post";

export const EditPostForm = ({ match }: MatchProps) => {
  const { postID } = match.params;

  const history = useHistory();
  const dispatch = useDispatch();

  const post = useSelector((state: RootState) =>
    state.posts.find((post) => post.id === postID)
  );

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleOnSubmit = (e: React.FormEvent) => {
    if (title && content) {
      e.preventDefault();
      dispatch(
        postUpdate({
          id: postID,
          title,
          content,
        })
      );
      history.push(`/posts/${postID}`);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            type="text"
            placeholder="Enter Title"
            onChange={onTitleChanged}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            value={content}
            type="text"
            placeholder="Enter Content"
            onChange={onContentChanged}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
