import typeApi from '@/api/typeApi';
import { useQuery } from 'react-query';

const useRelation = (typeId: string, search = '', page = '1') => {
  const key = ['type-relation', typeId, search, page];
  const { data, error, isLoading } = useQuery(
    key,
    async () => {
      return typeApi.getAllRelations(typeId, search, page);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );

  return { data, error, isLoading, key };
};
export default useRelation;
