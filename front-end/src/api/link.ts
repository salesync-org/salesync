import axios from './axiosConfig';

axios.defaults.baseURL = `${import.meta.env.VITE_TYPE_SERVICE_HOST}/api/v1/type`;

class LinkApi {
  async getAllLink(typeId: string) {
    const response = await axios.get(`/${typeId}/link`);

    return response.data;
  }
  async createLink(
    sourceId: string,
    sourceLabel: string,
    destinationId: string,
    destinationLabel: string,
    relationId: string
  ) {
    const response = await axios.post(`/link`, {
      source_type: {
        id: sourceId
      },
      source_type_label: sourceLabel,
      destination_type: {
        id: destinationId
      },
      destination_label: destinationLabel,
      relation: {
        id: relationId
      }
    });

    return response.data;
  }

  async updateLink(linkId: string, sourceLabel: string, destinationLabel: string) {
    const response = await axios.put(`/update`, {
      id: linkId,
      source_type_label: sourceLabel,
      destination_label: destinationLabel
    });

    return response.data;
  }
}

const linkApi = new LinkApi();
export default linkApi;
