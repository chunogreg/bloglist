import axios from "axios";
const baseUrl = "/api/blogs";

let token;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const create = (newBlog) => {
  const config = { headers: { Authorization: token } };
  const request = axios.post(baseUrl, newBlog, config);
  return request.then((response) => response.data);
};

export const update = (blogObj) => {
  const request = axios.put(`${baseUrl}/${blogObj.id}`, blogObj);
  return request.then((res) => res.data);
};

export const del = (id) => {
  const config = { headers: { Authorization: token } };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((res) => res.data);
};
