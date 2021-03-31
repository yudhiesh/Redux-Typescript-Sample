import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Users } from "../users/usersSlice";

interface PostAuthorProps {
  userID: string | undefined;
}

export const PostAuthor = ({ userID }: PostAuthorProps) => {
  const author = useSelector((state: RootState) =>
    state.users.find((user: Users) => user.id === userID)
  );

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
