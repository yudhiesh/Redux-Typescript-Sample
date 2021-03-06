import { EntityId } from "@reduxjs/toolkit";
import { RouteComponentProps } from "react-router-dom";

export interface Notification {
  id: string;
  date: string;
  message: string;
  user: string;
  read: boolean;
  isNew: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  username: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  user: string;
  reactions: EmojiKeysNumber;
}

export type Status = "idle" | "loading" | "succeeded" | "failed";

export type Error = string | null;

export interface InitialStateNotification {
  notifications: Notification[];
  status: Status;
  error: Error;
}

export interface InitialStatePost {
  posts: Post[];
  status: Status;
  error: Error;
}

export type EmojiKeys = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes";

export type EmojiKeysNumber = Record<EmojiKeys, number>;

export type EmojiKeysString = Record<EmojiKeys, string>;

export type ReactionAdd = {
  id: string;
  reaction: EmojiKeys;
};

export interface ReactionProps {
  post: Post;
}
export interface PostAuthorProps {
  userID: string;
}

interface MatchParamsPost {
  postID: string;
}

export type PostExcerptProps = { postId: EntityId };

export interface MatchPropsPost extends RouteComponentProps<MatchParamsPost> {}

interface MatchParamsUser {
  userId: string;
}

export interface MatchPropsUser extends RouteComponentProps<MatchParamsUser> {}

export interface TimeAgoProps {
  timestamp?: string;
}
