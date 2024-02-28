import instance from './axiosConfig';

class TypeApi {
  createType = async ({ type }: { type: Type }) => {
    const response = await instance.post('/type/create', type);
    return response.data;
  };

  getAllTypes = async () => {
    const response = await instance.get('/type/all');
    return response.data;
  };
}
const typeApi = new TypeApi();
export default typeApi;
