import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import { selectAllUsers } from "../users/usersSlice";
import {
  fetchNotifications,
  selectAllNotifications,
  allNotificationsRead,
} from "./notificationsSlice";
import { RootState, useAppDispatch } from "../../app/store";
import { User } from "../../types/types";
import { formatDistanceToNow, parseISO } from "date-fns";

export const Notification = () => {
  const dispatch = useAppDispatch();
  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);
  const notificationsStatus = useSelector(
    (state: RootState) => state.notifications.status
  );
  const error = useSelector((state: RootState) => state.notifications.error);

  // 1st useEffect is used to render the notifications for the first time
  // It also fetches the notifications when the status of the request is "idle"
  useEffect(() => {
    if (notificationsStatus === "idle") {
      dispatch(fetchNotifications());
    }
  }, [notificationsStatus, dispatch]);

  // 2nd useEffect is used to set the fields of isNew in the notifications to
  // true which fetches new notifications from the API
  useEffect(() => {
    dispatch(allNotificationsRead());
  });

  let content;
  if (notificationsStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (notificationsStatus === "succeeded") {
    content = notifications?.map((notification) => {
      const message = notification.message;
      const id = notification.id;
      const date = parseISO(notification.date);
      const timeAgo = formatDistanceToNow(date);
      const user = users.find(
        (user: User) => user.id === notification.user
      ) || {
        name: "Unknown User",
      };

      const notificationClassname = classnames("notifications", {
        new: notification.isNew,
      });

      return (
        <div key={id} className={notificationClassname}>
          <div>
            <b>{user.name}</b> {message}
          </div>
          <div title={notification.date}>
            <i>{timeAgo} ago</i>
          </div>
        </div>
      );
    });
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
