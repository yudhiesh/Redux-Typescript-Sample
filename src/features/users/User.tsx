import React from "react";
import { Link } from "react-router-dom";
import { MatchPropsUser, Post } from "../../types/types";

import { selectUsersById } from "./usersSlice";
import { selectPostByUser } from "../posts/postsSlice";
import { useTypedSelector } from "../../app/store";

export const User = ({ match }: MatchPropsUser) => {
  const { userId } = match.params;
  const user = useTypedSelector((state) => selectUsersById(state, userId));

  const userPost = useTypedSelector((state) => selectPostByUser(state, userId));

  const postTitle = userPost?.map((post: Post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ul>{postTitle}</ul>
    </section>
  );
};
