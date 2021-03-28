import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  id: string;
  title: string;
  content: string;
}

const initialState: InitialState[] = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
  { id: "3", title: "Third Post", content: "Hello World!" },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdd: (state, action: PayloadAction<InitialState>) => {
      state.push(action.payload);
    },
    postUpdate: (state, action: PayloadAction<InitialState>) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { postAdd, postUpdate } = postSlice.actions;

export default postSlice.reducer;
