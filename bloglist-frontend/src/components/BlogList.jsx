import { Link } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";

const BlogList = () => {
  const { blogs } = useBlogs();

  //console.log("===BLOGS ARE HERE===", blogs[3].id);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {" "}
      <ul>
        {sortedBlogs.map((blog) => (
          <li style={{ marginBottom: 10 }} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>{" "}
    </div>
  );
};

export default BlogList;
