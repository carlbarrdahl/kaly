import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
);

export default instance;
