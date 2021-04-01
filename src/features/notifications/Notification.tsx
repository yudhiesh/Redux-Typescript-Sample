import React from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Notifications, Users_ } from "../../types/types";

import { selectAllUsers } from "../users/usersSlice";
import { selectAllNotifications } from "./notificationsSlice";

export const Notification = () => {
  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);

  const renderedNotifications = notifications?.map(
    (notification: Notifications) => {
      const date = parseISO(notification.date);
      const timeAgo = formatDistanceToNow(date);
      const user =
        users.find((user: Users_) => user.id === notification.user) ||
        ({
          name: "Unknown User",
        } as Pick<Users_, "name">);

      return (
        <div key={notification.id} className="notification">
          <div>
            <b>{user.name}</b> {notification.message}
          </div>
          <div title={notification.date}>
            <i>{timeAgo} ago</i>
          </div>
        </div>
      );
    }
  );

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {notifications ? renderedNotifications : <h3>Loading....</h3>}
    </section>
  );
};
