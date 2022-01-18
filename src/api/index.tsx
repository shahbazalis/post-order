import axios from "axios";
import { UserInfo,ErrorInfo } from "../utility/interface";
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
  } catch (error: any) {
    console.log("Login error:", error.message);
    throw error;
  }
};
