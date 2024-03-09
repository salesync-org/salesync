import TypeCard from '@/components/ObjectCard/TypeCard';
import AsideNav from '@/components/RecordLayout/AsideNav';

const HomeLayout = () => {
  //create sample type
  let type: Type = {
    id: '1',
    name: 'User',
    description: 'User type',
    fields: [
      { id: '1', name: 'name', label: 'Name' },
      { id: '2', name: 'email', label: 'Email' },
      { id: '3', name: 'password', label: 'Password' },
      { id: '4', name: 'role', label: 'Role' },
      { id: '5', name: 'avatar_url', label: 'Avatar URL' }
    ]
  };

  return (
    <div className='flex min-h-dvh w-full'>
      <AsideNav />
      <main className='flex w-full flex-col'>
        <section className='h-12 w-full bg-primary-color'></section>
        <header className='h-12 w-full bg-white'></header>
        <div className='bg-main-background  grid  flex-grow grid-cols-1 bg-cover bg-no-repeat md:grid-cols-2'>
          <TypeCard type={type} />
          <TypeCard type={type} />
          <TypeCard type={type} />
        </div>
      </main>
    </div>
  );
};

export default HomeLayout;
