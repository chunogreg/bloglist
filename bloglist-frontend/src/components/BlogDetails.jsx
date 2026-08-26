import { Link, useParams, Navigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useBlogs } from "../hooks/useBlogs";
import UserContext from "../hooks/UserContext";
import { useContext } from "react";
import { useField } from "../hooks/useField";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { blogs, isLoading, deleteBlog, updateBlog, addComment } = useBlogs();
  const commentField = useField("text");

  if (isLoading) {
    return <div>loading data...</div>;
  }

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return <Navigate to="/" replace />;
  }

  const style = { marginBottom: 15 };

  return (
    <div
      style={{
        marginLeft: 20,
        boxShadow: " 0px 4px 10px #a2a6aa",
        padding: 20,
        width: 600,
        background: "#eff0f4e3",
      }}
    >
      <div>
        {/* <Link to="/">back to blogs list</Link> */}
        <h2>{blog.title}</h2>
        <h4>Written by: {blog.author}</h4>
        <div style={style}>
          <a href={blog.url}> {blog.url}</a>
        </div>

        {user ? (
          <>
            <div>
              <div style={style}>Added by {blog.userId.name}</div>
              <span style={{ fontWeight: "bold" }}>{blog.likes} likes </span>
              <Button
                variant="outlined"
                sx={{ border: 2, fontWeight: "bold", marginLeft: 2 }}
                onClick={() => updateBlog(blog)}
              >
                like
              </Button>{" "}
              {user && user.name === blog.userId.name && (
                <Button
                  variant="outlined"
                  sx={{
                    border: 1,
                    ml: "auto",
                    color: "#874304ee",

                    float: "right",
                  }}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete ${blog.title} `,
                      )
                    )
                      deleteBlog(blog.id);
                  }}
                >
                  delete
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <div style={style}>Added by {blog.userId.name}</div>
            <div style={{ fontWeight: "bold" }}> {blog.likes} likes</div>

            <p>
              <i style={{ color: "lightcoral" }}>login to like this blog</i>
            </p>
          </>
        )}
        <div>
          <h3>comments</h3>
          <div style={{ marginBottom: 20 }}>
            <TextField
              variant="outlined"
              label="your comment goes here"
              {...commentField.vals}
              size="small"
              sx={{
                marginRight: 1,
                background: "#ffffff",
                borderColor: "#0f1012",
              }}
            />
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                addComment(commentField.vals.value, blog);
                commentField.reset();
              }}
            >
              add comment
            </Button>{" "}
          </div>
          <div style={{ marginLeft: "33px", marginTop: "15px" }}>
            {blog.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetails;
