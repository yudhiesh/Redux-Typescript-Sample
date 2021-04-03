import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch, useTypedSelector } from "../../app/store";
import { Users_ } from "../../types/types";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch: AppDispatch = useDispatch();
  const users = useTypedSelector((state) => selectAllUsers(state));
  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const handleOnSubmit = async (e: React.FormEvent) => {
    if (canSave) {
      try {
        e.preventDefault();
        setAddRequestStatus("pending");
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        );
        unwrapResult(resultAction);
        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.log("Failed to save the post: ", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users?.map((user: Users_) => (
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
