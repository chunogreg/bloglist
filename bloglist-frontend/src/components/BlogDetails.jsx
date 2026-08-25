import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useBlogs } from "../hooks/useBlogs";

const BlogDetails = ({ user }) => {
  const { id } = useParams();
  const { blogs, isLoading, deleteBlog, updateBlog } = useBlogs();
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
        boxShadow: " 0px 4px 10px #b4bdc5",
        padding: 20,
        width: 600,
        background: "#f8f7f3e3",
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
      </div>
    </div>
  );
};
export default BlogDetails;
