import {
    createAsyncThunk,
    createEntityAdapter, createSlice
} from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import {
    InitialStateNotification, Notification
} from "../../types/types";

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});


const hello = () =>;

const initialState = notificationsAdapter.getInitialState({
  status: "idle",
  error: null,
} as InitialStateNotification);

export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  { state: RootState }
>("notifications/fetchNotifications", async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState());
  const [latestNotification] = allNotifications;
  const latestTimestamp = latestNotification ? latestNotification.date : "";
  const response = await client.get(
    `/fakeApi/notifications?since=${latestTimestamp}`
  );
  return response.notifications;
});

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach((notification) => {
        notification && (notification.read = true);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.status = "failed";
      // Replace undefined with null
      state.error = action.error.message ?? null;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.status = "succeeded";
      Object.values(state.entities).forEach((notification) => {
        notification && (notification.isNew = !notification.read);
      });
      notificationsAdapter.upsertMany(state, action.payload);
    });
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const {
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors<RootState>(
  (state) => state.notifications
);
