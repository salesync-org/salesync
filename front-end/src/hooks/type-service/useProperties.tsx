import typeApi from '@/api/type';
// import { TypeProperty } from '@/type';

import { useQuery } from 'react-query';

const useProperties = (companyName: string, typeId: string | undefined) => {
  const key = ['properties', typeId];
  const { data, error, isLoading } = useQuery<TypeProperty>(
    key,
    async () => {
      if (!typeId) {
        return;
      }

      return typeApi.getTypeProperties(companyName, typeId);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      enabled: !!typeId
    }
  );

  return { data, error, isLoading, key };
};
export default useProperties;
