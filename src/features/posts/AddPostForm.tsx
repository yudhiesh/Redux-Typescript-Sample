import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { InitialState } from "./postsSlice";

type Post = Partial<InitialState>;

const defaultPost: InitialState = {
  id: "",
  title: "",
  content: "",
};

export const AddPostForm = () => {
  const [post, setPost] = useState(defaultPost);

  const onInputChange = <P extends keyof Post>(prop: P, value: Post[P]) => {
    setPost({ ...post, [prop]: value });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    // send data to the Redux store
  };

  return (
    <div>
      <h1>Add Post</h1>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={defaultPost.title}
            onChange={(e) => onInputChange("title", e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            placeholder="Content"
            value={defaultPost.content}
            onChange={(e) => onInputChange("content", e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onSubmit={handleOnSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
