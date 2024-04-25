import stageApi from '@/api/stage';
import { useQuery } from 'react-query';

const useStages = (companyName: string, typeId: string) => {
  const key = ['stages', typeId];
  const { data, error, isLoading } = useQuery(
    key,
    async () => {
      return stageApi.getAllStages(companyName, typeId);
    },
    {
      enabled: !!typeId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );

  if (error) {
    console.error('Error fetching records:', error);
  }

  return { data, error, isLoading, key };
};
export default useStages;
