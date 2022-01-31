import { UserInfo} from "../interfaces/UserInfo";
import { getStorageData,setStorageData } from "../utils/sessionStorage";
import instance from "../utils/axiosInstance";
import {clientId,url} from "../utils/constant"

export const login = async (userInfo: UserInfo) => {
  try {
    const loginInfo = {
      client_id: clientId,
      name: userInfo.name,
      email: userInfo.email,
    };
    const loginResult = await instance.post(url + "/register", loginInfo);
    setStorageData("accessToken", loginResult.data.data.sl_token);
    return loginResult;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
};

export const getPosts = async (page:number) => {
  try {
    const accessToken = getStorageData("accessToken");
    const posts = await instance.get(url + "/posts", {
        params: {
            sl_token: accessToken,
            page:page
        }
      });
    return posts.data.data.posts;
  } catch (error) {
    console.log("Post list error:", error);
    throw error;
  }
};
