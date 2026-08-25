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
    <div style={{ marginLeft: 20 }}>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: "#d1d3dbe6" }}>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                {" "}
                <strong>Username</strong>
              </TableCell>
              <TableCell>
                {" "}
                <strong>Blogs posted</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
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
  );
};

export default UserList;
