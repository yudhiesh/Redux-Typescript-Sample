import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

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
    postAdd: {
      reducer(state, action: PayloadAction<InitialState>) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    postUpdate: {
      reducer(state, action: PayloadAction<InitialState>) {
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
  },
});

export const { postAdd, postUpdate } = postSlice.actions;

export default postSlice.reducer;
