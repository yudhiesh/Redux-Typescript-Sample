import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import { Notifications } from "../../types/types";

export const selectAllNotifications = (state: RootState) => state.notifications;

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotifications] = allNotifications;
    const latestTimestamp = latestNotifications ? latestNotifications.date : "";
    const response = await client.get(
      `api/notifications?since=${latestTimestamp}`
    );
    return response.notifications;
  }
);


const notificationSlice = createSlice({
  name: "notification",
  [] as Notifications,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action) => {
        state.push(action.payload);
        state.sort((a, b) => b.date.localeCompare(a.date));
      }
    );
  },
});

export default notificationSlice.reducer;
