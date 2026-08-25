import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import AddBlog from "./AddBlog";
import blogService from "../services/blogs";
import BlogDetails from "./BlogDetails";

import { expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const blogs = [
  {
    title: "The first Test Blog",
    author: "Test Author 1",
    url: "https://test-blog-1.com",
    id: "123",
    userId: { name: "Test User" },
  },
];

const renderBlogDetails = (customUser = null) => {
  render(
    <MemoryRouter initialEntries={["/blogs/123"]}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails
              blogs={blogs}
              onDelete={vi.fn()}
              handleBlogLike={vi.fn()}
              user={customUser}
            />
          }
        />
      </Routes>
    </MemoryRouter>,
  );
};

test("only the title and author of a blog are rendered by default", () => {
  const blog = blogs[0];
  render(
    <MemoryRouter>
      <Blog blog={blog} />
    </MemoryRouter>,
  );

  expect(screen.getByText("The first Test Blog")).toBeDefined();
  expect(screen.getByText("Test Author 1")).toBeDefined();
  //expect(screen.queryByText("https://test-blog-1.com")).toBeUndefined();
  expect(screen.queryByText("https://test-blog-1.com")).not.toBeInTheDocument();
});

test("Blog information shown to unauthorised user, buttons are not", async () => {
  renderBlogDetails();

  const title = screen.getByText("The first Test Blog");
  const author = screen.getByText("Written by: Test Author 1");
  const likes = screen.getByText("likes");
  const url = screen.getByText("https://test-blog-1.com");

  expect(title).toBeInTheDocument();
  expect(author).toBeInTheDocument();
  expect(likes).toBeInTheDocument();
  expect(url).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: /like/i }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /delete/i }),
  ).not.toBeInTheDocument();
});

test("Authenticated users who are not the blog’s creator are shown only the like button", async () => {
  renderBlogDetails(userEvent.setup());

  expect(screen.queryByRole("button", { name: /like/i })).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /delete/i }),
  ).not.toBeInTheDocument();
});

test("The blog’s creator is also shown the delete button", async () => {
  //const user = blogs.find((b) => (b.userId = { name: "Test User" }));
  renderBlogDetails(blogs[0].userId);

  expect(screen.queryByRole("button", { name: /like/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /delete/i })).toBeInTheDocument();
});

test("form calls the event handler with the right details as a new blog is created.", async () => {
  blogService.create = vi.fn();
  const user = userEvent.setup();

  const handleAddBlog = vi.fn();
  const setErrorMessage = vi.fn();

  render(
    <MemoryRouter>
      <AddBlog
        blog={blogs}
        handleAddBlog={handleAddBlog}
        setErrorMessage={setErrorMessage}
      />
      ,
    </MemoryRouter>,
  );

  const input = screen.getByLabelText("title");

  await user.type(input, "The first Test Blog");

  const createButton = screen.getByText("create");
  await user.click(createButton);

  console.log("MOCK CALL PAYLOAD", handleAddBlog.mock.calls);
  expect(handleAddBlog.mock.calls[0][0].title).toBe("The first Test Blog");
  expect(handleAddBlog.mock.calls).toHaveLength(1);
});
