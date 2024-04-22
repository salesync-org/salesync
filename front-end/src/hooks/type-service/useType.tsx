import typeApi from '@/api/type';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useAuth from '../useAuth';
import auth from '@/api/auth';

const useType = (defaultCompanyName?: string) => {
  const key = ['types'];
  const { user } = useAuth();
  const { companyName = defaultCompanyName } = useParams();

  const updateUserTypes = async (oldUser: User, types: Type[]) => {
    let newUser = JSON.parse(JSON.stringify(oldUser));
    const layoutOrder = newUser.settings.layout_order;

    for (const layout of layoutOrder) {
      for (const type of layout.types) {
        const typeIndex = types.findIndex((t) => t.id === type.type_id);
        if (typeIndex !== -1) {
          type.name = types[typeIndex].name;
          type.type_id = types[typeIndex].id;
        }
      }
    }

    newUser = { ...oldUser, settings: { ...oldUser.settings, layout_order: layoutOrder } };

    await auth.updateUser(companyName ?? '', newUser);
  };

  const { data, error, isLoading } = useQuery<Type[]>(
    key,
    async () => {
      const res = await typeApi.getAllTypes(companyName ?? '');

      if (user) {
        updateUserTypes(user, res);
      }

      return res;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      enabled: !!user
    }
  );

  return { types: data, error, isLoading, key };
};
export default useType;
