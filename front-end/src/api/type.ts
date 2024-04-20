import axios from './axiosConfig';

const URL = import.meta.env.VITE_GATEWAY_HOST;
class TypeApi {
  async getAllTypes(companyName: string) {
    const res = await axios.get(`${URL}/${companyName}/types`);
    return res.data;
  }

  async getTypeProperties(companyName: string, typeId: string) {
    const res = await axios.get(`${URL}/${companyName}/types/details/${typeId}`);
    return res.data;
  }
}

const typeApi = new TypeApi();
export default typeApi;
