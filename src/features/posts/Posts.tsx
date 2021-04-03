import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, selectPostsIds } from "./postsSlice";
import { RootState } from "../../app/store";
import { EntityId } from "@reduxjs/toolkit";
import { PostExcerpt } from "./PostExcerpt";

export const PostsList = () => {
  const dispatch = useDispatch();
  const orderedPostIds = useSelector(selectPostsIds);
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
    content = orderedPostIds.map((postId: EntityId) => {
      return <PostExcerpt key={postId} postId={postId} />;
    });
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
