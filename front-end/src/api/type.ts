import axios from './axiosConfig';

const URL = 'http://localhost:5000/api/v1/types1';

class TypeApi {
  async getAllTypes() {
    const res = await axios.get(URL);
    return res.data;
  }
}

const typeApi = new TypeApi();
export default typeApi;
