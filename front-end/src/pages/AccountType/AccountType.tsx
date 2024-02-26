import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Icon from '@/components/ui/Icon/Icon';
import ConfigTable from '@/components/ui/Table/ConfigTable';
import TextInput from '@/components/ui/TextInput/TextInput';
import useDebounce from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AccountType = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(-1);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      console.log('searching for:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className='mx-auto flex w-full max-w-[676px] flex-col gap-6 rounded-md bg-panel-light px-6 py-4 dark:bg-panel-dark'>
      <div className='flex items-center text-link-text-light dark:text-link-text-dark'>
        <Icon name='chevron_left' />
        <Link to='#' className='text-sm leading-4 underline'>
          Go back
        </Link>
      </div>
      <h1 className='text-2xl font-bold leading-7'>Account Type</h1>
      <div className='flex flex-col gap-2 md:flex-row'>
        <TextInput
          layoutClassName='flex-grow-1 w-full'
          className='w-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefixIcon='search'
          placeholder='Search for links'
        />
        <PrimaryButton onClick={() => {}} layoutClassName='flex-shrink-0'>
          <Icon name='add' />
          <span>Add Links</span>
        </PrimaryButton>
      </div>
      <ConfigTable />
    </div>
  );
};
export default AccountType;
