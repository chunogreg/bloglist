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
    retry: 1,
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
  };
};
