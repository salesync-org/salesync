import axios from './axiosConfig';
import { TYPE_SERVICE_URL } from '@/constants/api';

const URL = import.meta.env.VITE_GATEWAY_HOST;
class RecordApi {
  async getRecords(typeId: string) {
    const response = await axios.get(`${TYPE_SERVICE_URL}/${typeId}/records`);
    return response.data;
  }

  async getRecordDetails(recordId: string) {
    const response = await axios.get(`${TYPE_SERVICE_URL}/record/${recordId}`);
    return response.data;
  }

  async updateRecordStage(companyName: string, recordId: string, stageId: string) {
    const response = await axios.put(`${URL}/${companyName}/records/update-stage`, {
      record_id: recordId,
      stage_id: stageId
    });
    return response.data;
  }

  async getRecordDetail(companyName: string, recordId: string) {
    const response = await axios.get(`${URL}/${companyName}/records/list-record-type-relation/${recordId}`);
    return response.data;
  }
}

const recordApi = new RecordApi();
export default recordApi;
