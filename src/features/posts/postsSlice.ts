import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import {
  EmojiKeysNumber,
  Post,
  InitialStatePost,
  ReactionAdd,
} from "../../types/types";

// create the postAdapter object which will contain the ids & entities & the
// post
// Sort the posts instead of sorting it in the components
const postAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// Create the initialState which is Post & Pick<InitialStatePost, "status" |
// "error">
const initialState = postAdapter.getInitialState({
  status: "idle",
  error: "null",
} as Pick<InitialStatePost, "status" | "error">);

// postAdapter already provides the functionality to get the post by id and
// selecting all the post in state
// These functions are no longer needed
// export const selectAllPosts = (state: RootState) => state.posts.posts;

// export const selectPostById = (state: RootState, postId: string) =>
//   state.posts.posts.find((post: Post) => post.id === postId);

export const addNewPost = createAsyncThunk<
  Post,
  Pick<Post, "title" | "content" | "user">
>("posts/addPosts", async (initialPost) => {
  const response = await client.post("/fakeApi/posts", { post: initialPost });
  return response.post;
});

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const response = await client.get("/fakeApi/posts");
    return response.posts;
  }
);

export const startingEmoji: EmojiKeysNumber = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
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
        // Instead of looping over the data we access it by the id
        const existingPost = state.entities[id];
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
    reactionAdd: {
      reducer(state, action: PayloadAction<ReactionAdd>) {
        const { id, reaction } = action.payload;
        const existingPost = state.entities[id];
        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
      },
      prepare(id, reaction) {
        return {
          payload: {
            id,
            reaction,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      // adds all the incoming post to the state
      postAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ?? null;
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      // Add a single post to the posts
      postAdapter.addOne(state, action.payload);
    });
  },
});

export const { postUpdate, reactionAdd } = postSlice.actions;

export default postSlice.reducer;

// Export the base functions provided by createEntityAdapter
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postAdapter.getSelectors<RootState>((state) => state.posts);

export const selectPostByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: string) => userId],
  (posts, userId) => posts.filter((post: Post) => post.user === userId)
);
