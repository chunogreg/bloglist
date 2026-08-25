export const saveUser = (credential) => {
  window.localStorage.setItem("loggedInUser", JSON.stringify(credential));
};

export const getUser = () => {
  const loggedUserJson = window.localStorage.getItem("loggedInUser");

  if (loggedUserJson) {
    const user = JSON.parse(loggedUserJson);
    return user;
  }
};

export const removeUser = () => window.localStorage.removeItem("loggedInUser");
