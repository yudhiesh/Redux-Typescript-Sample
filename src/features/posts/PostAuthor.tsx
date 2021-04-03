import React from "react";
import { useTypedSelector } from "../../app/store";
import { PostAuthorProps } from "../../types/types";
import { selectUsersById } from "../users/usersSlice";

export const PostAuthor = ({ userID }: PostAuthorProps) => {
  const author = useTypedSelector((state) => selectUsersById(state, userID));

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
