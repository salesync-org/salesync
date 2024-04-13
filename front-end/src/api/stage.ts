import axios from './axiosConfig';

const URL = import.meta.env.VITE_GATEWAY_HOST;
class StageApi {
  async getAllStages(companyName: string, typeId: string) {
    const response = await axios.get(`${URL}/${companyName}/stages/${typeId}`);
    return response.data;
  }
}

const stageApi = new StageApi();
export default stageApi;
