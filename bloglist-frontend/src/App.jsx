import { useEffect, useContext } from "react";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import "../mycss.css";
import AddBlog from "./components/AddBlog";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { useBlogs } from "./hooks/useBlogs";
import UserContext from "./hooks/UserContext";
import UserList from "./components/UserList";

const App = () => {
  const { isLoading } = useBlogs();

  const { setUserAfterRefresh, user, logout } = useContext(UserContext);

  useEffect(() => {
    setUserAfterRefresh();
  }, [setUserAfterRefresh]);

  const style = { "&:hover": { bgcolor: "#3495f5" } };

  if (isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <Router>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#4c7ab2",
          height: 55,
          paddingRight: 8,
          marginBottom: 7,
        }}
      >
        <Toolbar>
          <Typography
            variant="body1"
            sx={{
              fontSize: "25px",
              marginTop: 0,
            }}
          >
            Blog App
          </Typography>

          <Box sx={{ ml: "auto" }}>
            <Button color="inherent" component={Link} to="/" sx={style}>
              blogs
            </Button>

            <Button color="inherent" component={Link} to="/users" sx={style}>
              users
            </Button>

            <Button color="inherent" component={Link} to="/create" sx={style}>
              new blog
            </Button>

            <Button
              color="inherent"
              component={Link}
              to={!user ? "/login" : "/"}
              sx={style}
            >
              {user ? (
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  logout
                </button>
              ) : (
                "login"
              )}
            </Button>
          </Box>
        </Toolbar>
        <Notification />
      </AppBar>

      <Routes>
        <Route path="/" element={<BlogList />} />

        <Route path="/blogs/:id" element={<BlogDetails />} />

        <Route
          path="/login"
          element={
            !user ? (
              <div>
                {" "}
                <LoginForm />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="/users" element={<UserList />}></Route>

        <Route path="/create" element={<AddBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
