import { Link } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";

const UserList = () => {
  const { users, isLoading } = useBlogs();

  if (isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {" "}
              <TableCell>Name</TableCell>
              <TableCell> Username</TableCell>
              <TableCell> Blogs Posted </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell> {user.username}</TableCell>
                <TableCell> {user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

    // <div>
    //   <ul>
    //     {users.map((user) => (
    //       <li style={{ marginBottom: 10 }} key={user.id}>
    //         {/* <Link to={`/blogs/${blog.id}`}> */}
    //         {user.name} - {user.username} {/* </Link> */}
    //       </li>
    //     ))}
    //   </ul>{" "}
    // </div>
  );
};

export default UserList;
