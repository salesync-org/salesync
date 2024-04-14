import instance from './axiosConfig';

const BASE_URL = `${import.meta.env.VITE_API_GATEWAY_HOST}/api/v1`;

class TypeApi {
  async getAllTypes() {
    const res = await instance.get(`${BASE_URL}/types`);
    return res.data;
  }
}

const typeApi = new TypeApi();
export default typeApi;
