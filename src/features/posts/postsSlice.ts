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
  },
});

export const { postAdd } = postSlice.actions;

export default postSlice.reducer;
