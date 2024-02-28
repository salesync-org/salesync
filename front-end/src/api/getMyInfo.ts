import { USER_SERVICE_URL } from "@/constants/api";
import instance from "./axiosConfig";

const getMyInfo = async () => {
  const response = await instance.get(`${USER_SERVICE_URL}/me`);
  console.log(response);
  return response;
}
export default getMyInfo;