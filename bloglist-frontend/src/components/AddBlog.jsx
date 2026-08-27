import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Stack } from "@mui/material";
import { useBlogs } from "../hooks/useBlogs";
import NotificationContext from "../hooks/notificationContext";
import { useField } from "../hooks/useField";

const AddBlog = () => {
  const { addNewBlog, isLoading } = useBlogs();
  const navigate = useNavigate();

  const { createBlogNotification } = useContext(NotificationContext);

  const titleField = useField("text");
  const authorField = useField("text");
  const urlField = useField("text");

  const handleReset = () => {
    titleField.reset();
    authorField.reset();
    urlField.reset();
  };

  const addBlog = async (event) => {
    event.preventDefault();

    addNewBlog({
      title: titleField.vals.value,
      author: authorField.vals.value,
      url: urlField.vals.value,
    });
    createBlogNotification();
    handleReset();

    navigate("/");
  };

  if (isLoading) {
    return <div>loading data...</div>;
  }
  //I simulated error here for exercise 7.8: Error boundary.
  //throw new Error("simulated error");
  return (
    <div style={{ marginLeft: 100 }}>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <Stack spacing={2}>
          <TextField
            variant="outlined"
            sx={{ width: "380px" }}
            size="small"
            label="title"
            {...titleField.vals}
          />

          <TextField
            variant="outlined"
            size="small"
            sx={{ width: "380px", marginTop: 10 }}
            label="author"
            {...authorField.vals}
          />

          <TextField
            variant="outlined"
            sx={{ width: "380px", marginTop: 10 }}
            size="small"
            label="url"
            {...urlField.vals}
          />
        </Stack>
        <Button type="submit" variant="contained" style={{ marginTop: 12 }}>
          create
        </Button>
      </form>
    </div>
  );
};

export default AddBlog;
