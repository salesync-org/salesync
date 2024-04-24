import typeApi from '@/api/type';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const useTypeRelation = (typeId: string, defaultCompanyName?: string) => {
  const key = ['type-relation', typeId];
  const { companyName = defaultCompanyName } = useParams();

  const { data, error, isLoading } = useQuery<TypeRelation[]>(
    key,
    async () => {
      const res = await typeApi.getTypeRelations(companyName ?? '', typeId);
      return res;
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
export default useTypeRelation;
