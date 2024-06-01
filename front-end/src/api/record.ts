import axios from './axiosConfig';
import { TYPE_SERVICE_URL } from '@/constants/api';

const URL = import.meta.env.VITE_GATEWAY_HOST;
const ELASTIC_HOST = import.meta.env.VITE_ELASTIC_SEARCH_HOST;
export type RecordsFilter = {
  searchTerm: string;
  isAsc: boolean | null;
  propertyName: string | null;
  currentPage: number;
  pageSize: number;
};
type Property = {
  property_id: string | null;
  property_name: string | null;
  property_label: string | null;
  item_value: string | null;
};

type HitSource = {
  user_id: string;
  '@version': string;
  '@timestamp': string;
  properties: Property[];
  name: string;
  record_id: string;
  company_name: string | null;
};

type Hit = {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: HitSource;
};

type InputData = {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: Hit[];
  };
};

type OutputProperty = {
  id: string | null;
  property_name: string | null;
  property_label: string | null;
  item_value: string | null;
};

type OutputRecord = {
  id: string;
  name: string;
  user_id: string;
  type: null;
  current_stage_id: null;
  properties: OutputProperty[];
};

type OutputData = {
  records: OutputRecord[];
  total_size: number;
  page_size: number;
  current_page: number;
};
function mapData(input: InputData): OutputData {
  const records: OutputRecord[] = input.hits.hits.map((hit) => {
    const source = hit._source;
    return {
      id: source.record_id,
      name: source.name,
      user_id: source.user_id,
      type: null,
      current_stage_id: null,
      properties: source.properties.map((prop) => ({
        id: prop.property_id,
        property_name: prop.property_name,
        property_label: prop.property_label,
        item_value: prop.item_value
      }))
    };
  });

  return {
    records: records,
    total_size: records.length,
    page_size: 3000,
    current_page: 1
  };
}

class RecordApi {
  async getRecords(companyName: string, typeId: string, recordFilter: RecordsFilter) {
    const response = await axios.post(`${ELASTIC_HOST}/records/_search?size=${1000}`, {
      query: {
        bool: {
          must: [
            {
              match: {
                company_name: companyName
              }
            },
            {
              match: {
                type_id: typeId
              }
            },
            {
              query_string: {
                query: recordFilter.searchTerm ? `*${recordFilter.searchTerm}*` : '*',
                fields: ['name', 'properties.item_value'],
                default_operator: 'AND'
              }
            }
          ]
        }
      }
    });
    return mapData(response.data);
  }

  async getAllRecords(companyName: string) {
    const response = await axios.post(`${ELASTIC_HOST}/records/_search?size=${1000}`, {
      query: {
        match: {
          company_name: companyName
        }
      }
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

  async getRelationRecord(companyName: string, recordId: string) {
    const response = await axios.get(`${URL}/${companyName}/records/list-record-type-relation/${recordId}`);
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
