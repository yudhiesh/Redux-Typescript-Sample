import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import {
  Notifications,
  InitialStateNotification,
  Error,
} from "../../types/types";

const initialState: InitialStateNotification = {
  notifications: [],
  status: "idle",
  error: null,
};

export const fetchNotifications = createAsyncThunk<
  Notifications,
  void,
  { state: RootState }
>("notifications/fetchNotifications", async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState());
  const [latestNotification] = allNotifications;
  // eslint-disable-next-line no-unused-vars
  const latestTimestamp = latestNotification ? latestNotification.date : "";
  const response = await client.get(
    `/fakeApi/notifications?since=${latestTimestamp}`
  );
  return response.notifications;
});

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as Error;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.notifications.push(action.payload);
      state.notifications.sort((a, b) => b.date.localeCompare(a.date));
    });
  },
});

export default notificationsSlice.reducer;

export const selectAllNotifications = (state: RootState) =>
  state.notifications.notifications;
