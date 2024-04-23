import axios from './axiosConfig';

const URL = import.meta.env.VITE_GATEWAY_HOST;
class StageApi {
  async getAllStages(companyName: string, typeId: string) {
    const response = await axios.get(`${URL}/${companyName}/stages/${typeId}`);
    return response.data;
  }
  async deleteStage(companyName: string, stageId: string) {
    const response = await axios.delete(`${URL}/${companyName}/stages/${stageId}`);
    if (response.status === 200 || response.status === 204) {
      return response.data;
    } else {
      throw new Error(`${response.data.message}`);
    }
  }
  async createStage(companyName: string, stage: Stage) {
    const response = await axios.post(`${URL}/${companyName}/stages`, stage);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error(`${response.data.message}`);
    }
  }

  async updateStage(companyName: string, stage: Stage) {
    const response = await axios.put(`${URL}/${companyName}/stages`, stage);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`${response.data.message}`);
    }
  }
}

const stageApi = new StageApi();
export default stageApi;
