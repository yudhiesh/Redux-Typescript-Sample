import { createSlice } from "@reduxjs/toolkit";

export interface Users {
  id: string;
  name: string;
}

const initialState: Users[] = [
  { id: "0", name: "Tianna Jenkins" },
  { id: "1", name: "Kevin Grant" },
  { id: "2", name: "Madison Price" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
