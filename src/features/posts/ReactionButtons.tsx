import React from "react";
import { reactionAdd } from "./postsSlice";
import { ReactionProps, EmojiKeysString, EmojiKeys } from "../../types/types";
import { useAppDispatch } from "../../app/store";

export const reactionEmojis: EmojiKeysString = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButtons = ({ post }: ReactionProps) => {
  const dispatch = useAppDispatch();
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
