import auth from '@/api/auth';
import typeApi from '@/api/type';
import { useQuery } from 'react-query';
import useAuth from '../useAuth';

const useType = (defaultCompanyName?: string) => {
  const key = ['types'];
  const { user } = useAuth();
  const { company } = useAuth();
  const companyName = company?.name ?? defaultCompanyName;
  const updateUserTypes = async (oldUser: User, types: Type[]) => {
    let newUser = JSON.parse(JSON.stringify(oldUser));
    const layoutOrder = newUser.settings.layout_order;

    for (const layout of layoutOrder) {
      for (const type of layout.types) {
        const typeIndex = Array.isArray(types) ? types.findIndex((t) => t.name === type.name) : -1;

        if (typeIndex !== -1) {
          type.name = types[typeIndex].name;
          type.type_id = types[typeIndex].id;
        }
      }
    }

    newUser = { ...oldUser, settings: { ...oldUser.settings, layout_order: layoutOrder } };

    console.log({ newUser });

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
      enabled: !!user && !!companyName
    }
  );

  return { types: data, error, isLoading, key };
};
export default useType;
