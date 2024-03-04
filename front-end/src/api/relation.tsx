import axios from './axiosConfig';

const URL = `${import.meta.env.VITE_TYPE_SERVICE_HOST}/api/v1/relation`;
class RelationApi {
  async getAllRelations() {
    const response = await axios.get(`${URL}/get-all`);
    return response.data;
  }
}

const relationApi = new RelationApi();
export default relationApi;
