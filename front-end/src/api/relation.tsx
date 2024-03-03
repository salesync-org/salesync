import axios from './axiosConfig';

axios.defaults.baseURL = `${import.meta.env.VITE_TYPE_SERVICE_HOST}/api/v1/relation`;

class RelationApi {
  async getAllRelations() {
    const response = await axios.get('/get-all');

    return response.data;
  }
}

const relationApi = new RelationApi();
export default relationApi;
