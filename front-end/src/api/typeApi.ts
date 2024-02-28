import { TYPE_SERVICE_URL } from '@/constants/api';
import axios from './axiosConfig';

class TypeApi {
  async getAllRelations(typeId: string) {
    const response = await axios.get(`${TYPE_SERVICE_URL}/${typeId}/link`);
    return response.data;
  }
}

const typeApi = new TypeApi();
export default typeApi;
