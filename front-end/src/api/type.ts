import instance from './axiosConfig';
const BASE_URL = `${import.meta.env.VITE_GATEWAY_HOST}`;

class TypeApi {
  async getAllTypes(companyName: string) {
    const res = await instance.get(`${BASE_URL}/${companyName}/types`);
    return res.data;
  }

  async getAllTemplates(companyName: string) {
    const res = await instance.get(`${BASE_URL}/${companyName}/templates`);
    return res.data;
  }

  async getAllProperties(companyName: string) {
    const res = await instance.get(`${BASE_URL}/${companyName}/types/properties`);
    return res.data;
  }

  async createType(companyName: string, data: any) {
    const res = await instance.post(`${BASE_URL}/${companyName}/types`, data);
    return res.data;
  }

  async createTypeProperty(companyName: string, data: any) {
    const res = await instance.post(`${BASE_URL}/${companyName}/types/create-property`, data);
    return res.data;
  }

  async loadTypeDetail(companyName: string, typeId: string): Promise<TypeDetail> {
    const res = await instance.get(`${BASE_URL}/${companyName}/types/details/${typeId}`);
    return res.data;
  }

  async getTypeProperties(companyName: string, typeId: string) {
    const res = await instance.get(`${BASE_URL}/${companyName}/types/details/${typeId}`);
    return res.data;
  }

  async deleteTypeProperty(companyName: string, propertyId: string) {
    const res = await instance.delete(`${BASE_URL}/${companyName}/types/delete-property/${propertyId}`);
    return res.data;
  }

  async getAllRelations(companyName: string) {
    const res = await instance.get(`${BASE_URL}/${companyName}/relations`);
    return res.data;
  }

  async getTypeRelations(companyName: string, typeId: string) {
    const res = await instance.get(`${BASE_URL}/${companyName}/types/relations/${typeId}`);
    return res.data;
  }

  async createTypeRelation(companyName: string, data: TypeRelation) {
    const res = await instance.post(`${BASE_URL}/${companyName}/types/create-relation`, data);
    return res.data;
  }
}

const typeApi = new TypeApi();
export default typeApi;
