import axios from './axiosConfig';
import { TYPE_SERVICE_URL } from '@/constants/api';

class PropertyApi {
  async getAllProperties(typeId: string) {
    const response = await axios.get(`${TYPE_SERVICE_URL}/${typeId}/properties`);
    return response.data;
  }
}

const propertyApi = new PropertyApi();
export default propertyApi;
