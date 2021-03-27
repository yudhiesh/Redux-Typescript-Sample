import React, { useState } from "react";
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

  const handleOnSubmit = () => {
    console.log("Submit Form");
    if (title && content) {
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
      <section>
        <form>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postContent">Content:</label>
          <input
            type="text"
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
          <button type="button" onClick={handleOnSubmit}>
            Save Post
          </button>
        </form>
      </section>
    </div>
  );
};
