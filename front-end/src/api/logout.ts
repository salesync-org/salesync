import { USER_SERVICE_URL } from "@/constants/api";
import instance from "./axiosConfig";

const logOut = async () => {
  const response = await instance.post(`${USER_SERVICE_URL}/logout`);
  return response;
}
export default logOut;