import typeApi from '@/api/type';
import { useQuery } from 'react-query';

const useProperty = (typeId: string) => {
  const key = ['properties', typeId];
  const { data, error, isLoading } = useQuery<PropertyResponse[]>(
    key,
    async () => {
      if (!typeId) {
        return;
      }

      return typeApi.getAllProperties(typeId);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );

  return { properties: data, error, isLoading, key };
};
export default useProperty;
