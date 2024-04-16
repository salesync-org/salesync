import instance from './axiosConfig';

const BASE_URL = `${import.meta.env.VITE_API_GATEWAY_HOST}/api/v1`;

class TypeApi {
  async getAllTypes(companyName: string) {
    const res = await instance.get(`${BASE_URL}/${companyName}/types`);
    return res.data;
  }

  async getAllProperties(companyName: string) {
    const res = await instance.get(`${BASE_URL}/${companyName}/types/properties`);
    return res.data;
  }
}

const typeApi = new TypeApi();
export default typeApi;
