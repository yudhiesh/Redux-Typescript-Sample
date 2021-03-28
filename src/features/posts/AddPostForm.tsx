import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { postAdd } from "./postsSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const handleOnSubmit = (e: React.FormEvent) => {
    if (title && content) {
      e.preventDefault();
      dispatch(postAdd(title, content, userId));
      setTitle("");
      setContent("");
    }
  };
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users?.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div>
      <h1>Add Post</h1>
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
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <Button variant="primary" type="submit" disabled={!canSave}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
