import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Counter } from "./features/counter/Counter";
import { PostsList } from "./features/posts/Posts";
import { AddPostForm } from "./features/posts/AddPostForm";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Counter} />
          <Route path="/posts" component={PostsList} />
          <Route path="/addposts" component={AddPostForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
