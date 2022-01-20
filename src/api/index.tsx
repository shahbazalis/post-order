import axios from "axios";
import { UserInfo, ErrorInfo } from "../utility/interface";
import { getStorageData } from "../utility/sessionStorage";

const url = "https://api.supermetrics.com/assignment";

export const login = async (userInfo: UserInfo) => {
  try {
    const loginInfo = {
      client_id: "ju16a6m81mhid5ue1z3v2g0uh",
      name: userInfo.name,
      email: userInfo.email,
    };
    const loginResult = await axios.post(url + "/register", loginInfo);
    return loginResult;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const accessToken = await getStorageData("accessToken");
    const posts = await axios.get(url + "/posts", {
        params: {
            sl_token: accessToken
        }
      });
    return posts.data.data;
  } catch (error) {
    console.log("Post list error:", error);
    throw error;
  }
};
