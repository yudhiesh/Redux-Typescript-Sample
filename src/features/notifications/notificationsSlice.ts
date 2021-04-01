import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import { Notifications } from "../../types/types";

export const fetchNotifications = createAsyncThunk<
  Notifications,
  void,
  { state: RootState }
>("notifications/fetchNotifications", async (_, { getState }) => {
  // We know that the state of the notifications are all contained inside the
  // store
  const allNotifications = selectAllNotifications(getState());
  const [latestNotification] = allNotifications;
  // eslint-disable-next-line no-unused-vars
  const latestTimestamp = latestNotification ? latestNotification.date : "";
  const response = await client.get(`/fakeApi/notifications`);
  return response.notifications;
});

// Initial State for the notifications
const initialState: Notifications[] = [];

const notificationsSlice = createSlice({
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

export default notificationsSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications;
