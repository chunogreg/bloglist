import { createContext, useReducer } from "react";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const initialState = null;
  const myReducer = (state, action) => {
    if (action.type === "showMessage") {
      return action.data;
    } else if (action.type === "hideMessage") {
      return null;
    } else {
      return state;
    }
  };

  const [message, dispatch] = useReducer(myReducer, initialState);

  const loginSuccess = () => {
    dispatch({
      type: "showMessage",
      data: {
        type: "success",
        text: "Login successful",
      },
    });
    timeout();
  };

  const loginFailure = () => {
    dispatch({
      type: "showMessage",
      data: {
        type: "error",
        text: "Invalid username or password",
      },
    });
    timeout();
  };

  const createBlogNotification = () => {
    dispatch({
      type: "showMessage",
      data: {
        type: "success",
        text: "A new blog is created",
      },
    });
    timeout();
  };
  const timeout = () =>
    setTimeout(() => {
      dispatch({
        type: "hideMessage",
      });
    }, 6000);

  return (
    <NotificationContext.Provider
      value={{
        loginSuccess,
        loginFailure,
        createBlogNotification,
        message,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
