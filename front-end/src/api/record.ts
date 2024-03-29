import axios from './axiosConfig';
import { TYPE_SERVICE_URL } from '@/constants/api';

class RecordApi {
  async getRecords(typeId: string) {
    const response = await axios.get(`${TYPE_SERVICE_URL}/${typeId}/records`);
    return response.data;
  }

  async getRecordDetails(recordId: string) {
    const response = await axios.get(`${TYPE_SERVICE_URL}/record/${recordId}`);
    return response.data;
  }

  async updateRecordStage(recordId: string, stageId: string) {
    const response = await axios.put(`${TYPE_SERVICE_URL}/record/${recordId}`, { stageId });
    return response.data;
  }
}

const recordApi = new RecordApi();
export default recordApi;
