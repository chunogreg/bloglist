import axios from "axios";
import { getAll, create, del, update } from "../services/blogs";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export const useBlogs = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
    retry: 1,
  });

  const userResult = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      return response.data;
    },
    retry: 15,
  });

  const newMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: del,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const newCommentMutation = useMutation({
    mutationFn: ({ newComment, blogObj }) => {
      const request = axios.post(`/api/blogs/${blogObj.id}/comments`, {
        comment: newComment,
      });
      return request.then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.log("LENGTH ERROR: ", error.response.data.error);
    },
  });

  return {
    blogs: result.data,
    users: userResult.data,
    isLoading: result.isLoading,
    addNewBlog: (blog) => {
      newMutation.mutate(blog);
    },

    deleteBlog: (id) => {
      deleteBlogMutation.mutate(id);
    },
    updateBlog: (blogObj) => {
      updateBlogMutation.mutate({
        ...blogObj,
        likes: blogObj.likes + 1,
      });
    },
    addComment: (newComment, blogObj) => {
      newCommentMutation.mutate({
        newComment,
        blogObj,
      });
    },
  };
};
