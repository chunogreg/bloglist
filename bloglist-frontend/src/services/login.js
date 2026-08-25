import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentils) => {
  const response = await axios.post(baseUrl, credentils);
  return response.data;
};

export default { login };
