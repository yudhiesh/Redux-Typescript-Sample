import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "./usersSlice";
import { Users_ } from "../../types/types";

export const Users = () => {
  const users = useSelector(selectAllUsers);
  const renderedUsers = users?.map((user: Users_) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));
  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};
