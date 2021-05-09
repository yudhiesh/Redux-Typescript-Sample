import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { useHistory } from "react-router-dom";
import { postUpdate, selectPostById } from "./postsSlice";
import { MatchPropsPost } from "../../types/types";

export const EditPostForm = ({ match }: MatchPropsPost) => {
  const { postID } = match.params;

  const history = useHistory();
  const dispatch = useAppDispatch();

  const post = useSelector((state: RootState) => selectPostById(state, postID));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleOnSubmit = (e: React.FormEvent) => {
    if (title && content) {
      e.preventDefault();
      dispatch(postUpdate(postID, title, content));
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
