import axios from "axios";
import { getStorageData } from "./sessionStorage";
import { login, getPosts } from "../api/index";
import { useDispatch } from "react-redux";

const instance = axios.create({
  baseURL: "https://api.supermetrics.com/assignment/",
});

instance.interceptors.request.use(async (request) => {
  const accessToken = await getStorageData("accessToken");
  request.params = request.params || {};
  request.params['sl_token'] = accessToken;
  return request;
});

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 500 && !originalRequest._retry) {
      //const dispatch = useDispatch();
      const userInfo = JSON.parse(getStorageData("userInfo")!);
      const loginResult = await login(userInfo);
      if (loginResult) {
        const accessToken = await getStorageData("accessToken");
       // dispatch({ type: "SIGN_IN", accessToken: accessToken });
       const page:any= await getStorageData("page");
        return await getPosts(page);
      }
    }
  }
);
export default instance;
