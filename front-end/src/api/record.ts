import axios from './axiosConfig';
import { TYPE_SERVICE_URL } from '@/constants/api';

class RecordApi {
  async getRecords(typeId: string) {
    const response = await axios.get(`${TYPE_SERVICE_URL}/${typeId}/records`);
    return response.data;
  }
}

const recordApi = new RecordApi();
export default recordApi;
