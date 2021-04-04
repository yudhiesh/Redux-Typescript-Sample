import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import { Users_ } from "../../types/types";

const usersAdapter = createEntityAdapter<Users_>();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk<Users_[]>(
  "users/fetchUsers",
  async () => {
    const response = await client.get("/fakeApi/users");
    return response.users;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
    });
  },
});

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
} = usersAdapter.getSelectors<RootState>((state) => state.users);
