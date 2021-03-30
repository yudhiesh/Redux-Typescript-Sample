import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  id: string;
  title: string;
  content: string;
}
export interface InitialStateUser extends InitialState {
  date?: string;
  userID?: string;
  reactions?: EmojiKeysNumber;
}

export type EmojiKeys = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes";

export type EmojiKeysNumber = Record<EmojiKeys, number>;
export type EmojiKeysString = Record<EmojiKeys, string>;

export const startingEmoji: EmojiKeysNumber = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
};

const initialState: InitialStateUser[] = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
  },
  {
    id: "3",
    title: "Third Post",
    content: "Hello World!",

    reactions: { thumbsUp: 0, hooray: 1, heart: 1, rocket: 1, eyes: 0 },
  },
  {
    id: "4",
    title: "Fourth Post",
    content: "Hi World!",
    date: "2021-03-29T06:02:41.692Z",
    reactions: { thumbsUp: 0, hooray: 1, heart: 1, rocket: 1, eyes: 0 },
  },
  {
    id: "5",
    title: "Fifth Post",
    content: "Hi again World!",
    date: "2021-03-29T06:04:35.008Z",
    reactions: { thumbsUp: 0, hooray: 1, heart: 1, rocket: 1, eyes: 0 },
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdd: {
      reducer(state, action: PayloadAction<InitialStateUser>) {
        state.push(action.payload);
      },
      prepare(title, content, userID) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userID,
            reactions: startingEmoji,
          },
        };
      },
    },
    postUpdate: {
      reducer(
        state,
        action: PayloadAction<
          Pick<InitialStateUser, "id" | "title" | "content">
        >
      ) {
        const { id, title, content } = action.payload;
        const existingPost = state.find((post) => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
        }
      },
      prepare(id, title, content) {
        return {
          payload: {
            id,
            title,
            content,
          },
        };
      },
    },
    reactionAdd(
      state,
      action: PayloadAction<{ id: string; reaction: string }>
    ) {
      const { id, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.reactions
          ? existingPost.reactions[reaction as keyof EmojiKeysString]++
          : (existingPost.reactions = startingEmoji);
      }
    },
  },
});

export const { postAdd, postUpdate, reactionAdd } = postSlice.actions;

export default postSlice.reducer;
