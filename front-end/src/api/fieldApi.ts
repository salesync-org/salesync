import axios from './axiosConfig';

const URL = `${import.meta.env.VITE_RECORD_SERVICE_HOST}/api/v1/field`;

class FieldApi {
  createField = async (fieldName: string, labelName: string) => {
    const response = await axios.post(`${URL}/create-field`, {
      fieldName: fieldName,
      labelName: labelName
    });

    return response.data;
  };

  deleteField = async () => {
    // nothing
  };
}

const fieldApi = new FieldApi();
export default fieldApi;
