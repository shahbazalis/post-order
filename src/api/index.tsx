import { UserInfo, ErrorInfo } from "../utility/interface";
import { getStorageData,setStorageData } from "../utility/sessionStorage";
import instance from "../utility/axiosInstance";

const url = "https://api.supermetrics.com/assignment";

export const login = async (userInfo: UserInfo) => {
  try {
    const loginInfo = {
      client_id: "ju16a6m81mhid5ue1z3v2g0uh",
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
    const accessToken = await getStorageData("accessToken");
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
