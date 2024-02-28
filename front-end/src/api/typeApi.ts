import instance from './axiosConfig';

class TypeApi {
  createType = async ({ typeName, template }: { typeName: String; template: String }) => {
    const response = await instance.post('http://localhost:8080/type/create', {
      name: typeName
    });
    return response.data;
  };

  getAllTypes = async () => {
    const response = await instance.get('http://localhost:8080/type/get-all');
    return response.data;
  };
}
const typeApi = new TypeApi();
export default typeApi;
