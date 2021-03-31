import React from "react";
import { EmojiKeys, Post, reactionAdd, EmojiKeysString } from "./postsSlice";
import { useDispatch } from "react-redux";

export const reactionEmojis: EmojiKeysString = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

interface ReactionProps {
  post: Post;
}

export const ReactionButtons = ({ post }: ReactionProps) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmojis).map(
    ([name, emoji]) => {
      return (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            dispatch(reactionAdd({ id: post.id, reaction: name as EmojiKeys }))
          }
        >
          {emoji}{" "}
          {post.reactions && post.reactions[name as keyof EmojiKeysString]}
        </button>
      );
    }
  );

  return <div>{reactionButtons}</div>;
};
