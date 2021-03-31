import { RouteComponentProps } from "react-router-dom";

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

interface MatchParams {
  postID: string;
}

export interface MatchProps extends RouteComponentProps<MatchParams> {}
