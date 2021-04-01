import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import {
  Error,
  EmojiKeysNumber,
  Post,
  InitialStatePost,
  ReactionAdd,
} from "../../types/types";

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post: Post) => post.id === postId);

export const addNewPost = createAsyncThunk(
  "posts/addPosts",
  async (initialPost: Pick<Post, "title" | "content" | "user">) => {
    const response = await client.post("/fakeApi/posts", { post: initialPost });
    return response.post;
  }
);

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

const initialState: InitialStatePost = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
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
    reactionAdd(state, action: PayloadAction<ReactionAdd>) {
      const { id, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
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
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
  },
});

export const { postUpdate, reactionAdd } = postSlice.actions;

export default postSlice.reducer;
