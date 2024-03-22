import { TYPE_SERVICE_URL } from '@/constants/api';
import axios from './axiosConfig';

// const URL = 'http://localhost:5000/api/v1/types';

class TypeApi {
  async getAllTypes() {
    const res = await axios.get(TYPE_SERVICE_URL);
    return res.data;
  }
}

const typeApi = new TypeApi();
export default typeApi;
