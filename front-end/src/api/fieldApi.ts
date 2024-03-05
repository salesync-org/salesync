import axios from './axiosConfig';

const URL = `${import.meta.env.VITE_RECORD_SERVICE_HOST}/api/v1`;

class FieldApi {
  async getAllFields(typeId: string) {
    const response = await axios.get(`${URL}/property/${typeId}`);

    return response.data;
  }

  createField = async (typeId: string, name: string, label: string, defaultValue: string) => {
    const response = await axios.post(`${URL}/property/create`, {
      typeId,
      name,
      label,
      defaultValue
    });

    return response.data;
  };

  deleteField = async () => {
    // nothing
  };
}

const fieldApi = new FieldApi();
export default fieldApi;
