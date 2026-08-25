import { useParams } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";

const UserDetails = () => {
  const { users } = useBlogs();
  const { id } = useParams();
  const user = users.find((u) => u.id === id);

  return (
    <div style={{ marginLeft: 30 }}>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      {user.blogs.map((blog) => (
        <li key={blog.id} style={{ marginBottom: 5, marginLeft: 30 }}>
          {blog.title}
        </li>
      ))}
    </div>
  );
};

export default UserDetails;
