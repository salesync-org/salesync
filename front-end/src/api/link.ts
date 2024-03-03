import axios from './axiosConfig';

axios.defaults.baseURL = `${import.meta.env.VITE_TYPE_SERVICE_HOST}/api/v1/type`;

class LinkApi {
  async getAllLink(typeId: string) {
    const response = await axios.get(`/${typeId}/link`);

    return response.data;
  }
}

const linkApi = new LinkApi();
export default linkApi;
