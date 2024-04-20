import axios from './axiosConfig';
import { TYPE_SERVICE_URL } from '@/constants/api';

const URL = import.meta.env.VITE_GATEWAY_HOST;

export type RecordsFilter = {
  searchTerm: string;
  isAsc: boolean | null;
  propertyName: string | null;
  currentPage: number;
  pageSize: number;
};
class RecordApi {
  async getRecords(companyName: string, typeId: string, recordFilter: RecordsFilter) {
    const response = await axios.post(`${URL}/${companyName}/records/list`, {
      type_id: typeId,
      search_term: recordFilter.searchTerm,
      is_asc: recordFilter.isAsc,
      property_name: recordFilter.propertyName,
      current_page: recordFilter.currentPage,
      page_size: recordFilter.pageSize
    });
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

  async getProperties(companyName: string, typeId: string) {
    const response = await axios.get(`${URL}/${companyName}/types/${typeId}`);
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createRecord(companyName: string, typeId: string, data: any) {
    const response = await axios.post(`${URL}/${companyName}/records/${typeId}/create`, data);
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateRecord(companyName: string, recordId: string, data: any) {
    const response = await axios.put(`${URL}/${companyName}/records/${recordId}/update`, data);
    return response.data;
  }

  async deleteRecord(companyName: string, recordIds: string[]) {
    const response = await axios.delete(`${URL}/${companyName}/records`, {
      data: recordIds
    });
    return response.data;
  }

  async createRelation(companyName: string, sourceRecordId: string, targetRecordId: string) {
    const response = await axios.post(`${URL}/${companyName}/records/create-record-type-relation`, {
      source_record_id: sourceRecordId,
      destination_record_id: targetRecordId,
      type_relation_id: sourceRecordId
    });
    return response.data;
  }
}

const recordApi = new RecordApi();
export default recordApi;
