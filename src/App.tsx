import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Counter } from "./features/counter/Counter";
import { PostsList } from "./features/posts/Posts";
import { AddPostForm } from "./features/posts/AddPostForm";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Post } from "./features/posts/Post";
import { EditPostForm } from "./features/posts/EditPostForm";
import { Users } from "./features/users/Users";
import { User } from "./features/users/User";
import { Notification } from "./features/notifications/Notification";
import { useSelector } from "react-redux";
import {
  fetchNotifications,
  selectAllNotifications,
} from "./features/notifications/notificationsSlice";
import { useAppDispatch } from "./app/store";

function App() {
  const dispatch = useAppDispatch();
  const notifications = useSelector(selectAllNotifications);
  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;
  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };
  return (
    <Router>
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Counter
              </Nav.Link>
              <Nav.Link as={Link} to="/posts">
                Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/addposts">
                Add Post
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users Post
              </Nav.Link>
              <Nav.Link as={Link} to="/notifications">
                Notifications {unreadNotifications}
              </Nav.Link>
              <Button variant="light" onClick={fetchNewNotifications}>
                Refresh Notifications
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/posts/:postID" component={Post} />
          <Route exact path="/editPost/:postID" component={EditPostForm} />
          <Route exact path="/users/:userId" component={User} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/posts" component={PostsList} />
          <Route exact path="/addposts" component={AddPostForm} />
          <Route exact path="/notifications" component={Notification} />
          <Route path="/" component={Counter} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
