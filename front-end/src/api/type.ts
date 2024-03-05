import axios from './axiosConfig';

axios.defaults.baseURL = `${import.meta.env.VITE_TYPE_SERVICE_HOST}/api/v1/type`;

class TypeApi {
  createType = async ({ typeName, template }: { typeName: string; template: string }) => {
    const response = await axios.post('/create', {
      name: typeName
    });
    return response.data;
  };

  getAllTypes = async () => {
    const response = await axios.get('/get-all');
    return response.data;
  };
}

const typeApi = new TypeApi();
export default typeApi;
