import propertyApi from '@/api/propertyApi';
import { useQuery } from 'react-query';

const useProperties = (typeId: string) => {
  const key = ['properties', typeId];
  const { data, error, isLoading } = useQuery<TypeProperty>(
    key,
    async () => {
      if (!typeId) {
        return;
      }

      return propertyApi.getAllProperties(typeId);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );

  return { typeProperty: data, error, isLoading, key };
};
export default useProperties;
