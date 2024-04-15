import { TYPE_SERVICE_URL } from '@/constants/api';
import axios from './axiosConfig';

const URL = import.meta.env.VITE_GATEWAY_HOST;
class TypeApi {
  async getAllTypes() {
    const res = await axios.get(TYPE_SERVICE_URL);
    return res.data;
  }

  async getTypeProperties(companyName: string, typeId: string) {
    const res = await axios.get(`${URL}/${companyName}/types/details/${typeId}`);
    return res.data;
  }
}

const typeApi = new TypeApi();
export default typeApi;
