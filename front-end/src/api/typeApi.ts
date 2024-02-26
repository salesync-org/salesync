import instance from './axiosConfig';

class TypeApi {
  createType = async ({ type }: { type: Type }) => {
    console.log('aaaa');
    const response = await instance.post('/type/create', type);
    return response.data;
  };
}
const typeApi = new TypeApi();
export default typeApi;
