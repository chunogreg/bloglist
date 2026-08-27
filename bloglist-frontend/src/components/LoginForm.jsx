import { TextField, Button } from "@mui/material";
import { useField } from "../hooks/useField";
import NotificationContext from "../hooks/notificationContext";
import UserContext from "../hooks/UserContext";
import { useContext } from "react";

const LoginForm = () => {
  const usernameField = useField("text");
  const passwordField = useField("password");
  const { loginSuccess, loginFailure } = useContext(NotificationContext);
  const { login } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in . . .");

    try {
      await login({
        username: usernameField.vals.value,
        password: passwordField.vals.value,
      });
      loginSuccess();
      usernameField.reset();
      passwordField.reset();
    } catch {
      loginFailure();
      usernameField.reset();
      passwordField.reset();
    }
  };

  return (
    <div style={{ marginLeft: 100 }}>
      <form onSubmit={handleLogin}>
        <div>
          <h2>Log in to application</h2>
          <TextField
            variant="standard"
            sx={{ borderBottom: "1px solid black" }}
            label="Username"
            {...usernameField.vals}
          />
        </div>
        <div>
          {" "}
          <TextField
            variant="standard"
            style={{ marginTop: 10, borderBottom: "1px solid black" }}
            label="Password"
            {...passwordField.vals}
          />
        </div>

        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
            {" "}
            Login
          </Button>
        </div>
      </form>{" "}
    </div>
  );
};

export default LoginForm;
