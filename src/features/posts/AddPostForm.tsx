import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdd } from "./postsSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleOnSubmit = (e: React.FormEvent) => {
    if (title && content) {
      e.preventDefault();
      dispatch(
        postAdd({
          id: nanoid(),
          title: title,
          content: content,
        })
      );
      setTitle("");
      setContent("");
    }
  };

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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
