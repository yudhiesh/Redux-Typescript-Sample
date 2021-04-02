import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectAllUsers } from "../users/usersSlice";
import {
  fetchNotifications,
  selectAllNotifications,
} from "./notificationsSlice";
import { RootState } from "../../app/store";
import { Notifications, Users_ } from "../../types/types";
import { formatDistanceToNow, parseISO } from "date-fns";

export const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);
  const notificationsStatus = useSelector(
    (state: RootState) => state.notifications.status
  );
  const error = useSelector((state: RootState) => state.notifications.error);

  useEffect(() => {
    if (notificationsStatus === "idle") {
      dispatch(fetchNotifications());
    }
  }, [notificationsStatus, dispatch]);

  let content;
  if (notificationsStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (notificationsStatus === "succeeded") {
    // Not sure why the notifications come in the form of a nested array
    const notificationFlattenedSorted = notifications
      .flat()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = notificationFlattenedSorted?.map(
      (notification: Notifications) => {
        const message = notification.message;
        const id = notification.id;
        const date = parseISO(notification.date);
        const timeAgo = formatDistanceToNow(date);
        const user = users.find(
          (user: Users_) => user.id === notification.user
        ) || {
          name: "Unknown User",
        };

        return (
          <div key={id} className="notification">
            <div>
              <b>{user.name}</b> {message}
            </div>
            <div title={notification.date}>
              <i>{timeAgo} ago</i>
            </div>
          </div>
        );
      }
    );
  } else if (notificationsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {content}
    </section>
  );
};
