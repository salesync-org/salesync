import { TYPE_SERVICE_URL } from '@/constants/api';
import axios from './axiosConfig';

axios.defaults.baseURL = `${import.meta.env.VITE_TYPE_SERVICE_HOST}/api/v1/type`;

class TypeApi {
  async getAllRelations(typeId: string, search = '', page = '1', perPage = '6') {
    const response = await axios.get(
      `${TYPE_SERVICE_URL}/${typeId}/link?search=${search}&page=${page}&perPage=${perPage}`
    );
  }
  createType = async ({ typeName, template }: { typeName: String; template: String }) => {
    const response = await axios.post('http://localhost:8080/apis/v1/type/create', {
      name: typeName
    });
    return response.data;
  };

  getAllTypes = async () => {
    const response = await axios.get('/get-all');
    return response.data;
  };
}

const typeApi = new TypeApi();
export default typeApi;
