import { TYPE_SERVICE_URL } from '@/constants/api';
import axios from './axiosConfig';

class TypeApi {
  async getAllRelations(typeId: string, search = '', page = '1', perPage = '6') {
    const response = await axios.get(
      `${TYPE_SERVICE_URL}/${typeId}/link?search=${search}&page=${page}&perPage=${perPage}`
    );
    return response.data;
  }
}

const typeApi = new TypeApi();
export default typeApi;
