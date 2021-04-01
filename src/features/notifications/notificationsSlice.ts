import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import { Notifications } from "../../types/types";

export const selectAllNotifications = (state: RootState) => state.notifications;

export const fetchNotifications = createAsyncThunk<
  Notifications,
  void,
  { state: RootState }
>("notifications/fetchNotifications", async (_, thunkAPI) => {
  const { getState } = thunkAPI;
  const allNotifications = selectAllNotifications(getState());
  const [latestNotification] = allNotifications;
  const latestTimestamp = latestNotification ? latestNotification.date : "";
  const response = await client.get(
    `/api/notifications?since=${latestTimestamp}`
  );
  return response.notifications as Notifications;
});

// Initial State for the notifications
const initialState: Notifications[] = [];

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(action.payload);
      state.sort((a, b) => b.date.localeCompare(a.date));
    });
  },
});

export default notificationSlice.reducer;
