import typeApi from '@/api/typeApi';
import { useQuery } from 'react-query';

const useRelation = (typeId: string) => {
  const key = ['type', typeId];
  const { data, error, isLoading } = useQuery(
    key,
    async () => {
      return typeApi.getAllRelations(typeId);
    },
    {
      refetchOnWindowFocus: false
    }
  );

  return { data, error, isLoading, key };
};
export default useRelation;
