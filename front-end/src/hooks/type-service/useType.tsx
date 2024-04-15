import typeApi from '@/api/type';
import { Type } from '@/type';
import { useQuery } from 'react-query';

const useType = () => {
  const key = ['types'];
  const { data, error, isLoading } = useQuery<Type[]>(
    key,
    async () => {
      return typeApi.getAllTypes();
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );

  return { types: data, error, isLoading, key };
};
export default useType;
