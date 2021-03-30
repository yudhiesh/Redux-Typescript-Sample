import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";

export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  userID: string;
  reactions: EmojiKeysNumber;
}

type Status = "idle" | "loading" | "succeeded" | "failed";
type Error = string | null;

export interface InitialState {
  posts: Post[];
  status: Status;
  error: Error;
}

export type EmojiKeys = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes";

export type EmojiKeysNumber = Record<EmojiKeys, number>;
export type EmojiKeysString = Record<EmojiKeys, string>;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.posts;
});

export const startingEmoji: EmojiKeysNumber = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
};

const initialState: InitialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdd: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
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
        action: PayloadAction<Pick<Post, "id" | "title" | "content">>
      ) {
        const { id, title, content } = action.payload;
        const existingPost = state.posts.find((post) => post.id === id);
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
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.reactions
          ? existingPost.reactions[reaction as keyof EmojiKeysString]++
          : (existingPost.reactions = startingEmoji);
      }
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line no-unused-vars
    builder.addCase(fetchPosts.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts = state.posts.concat(action.payload);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as Error;
    });
  },
});

export const { postAdd, postUpdate, reactionAdd } = postSlice.actions;

export default postSlice.reducer;
