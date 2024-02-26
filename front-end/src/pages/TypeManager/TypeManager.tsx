import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Icon from '@/components/ui/Icon/Icon';
import ConfigTable from '@/components/ui/Table/ConfigTable';
import TextInput from '@/components/ui/TextInput/TextInput';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TypeManager = () => {
  const [search, setSearch] = useState('');
  return (
    <div className='mx-auto flex w-full max-w-[676px] flex-col gap-6 rounded-md bg-panel-light px-6 py-4 dark:bg-panel-dark'>
      <div className='flex items-center text-link-text-light dark:text-link-text-dark'>
        <Icon name='chevron_left' />
        <Link to='#' className='text-sm leading-4 underline'>
          Go back
        </Link>
      </div>
      <h1 className='text-2xl font-bold leading-7'>Type Manager</h1>
      <div className='flex gap-2'>
        <TextInput
          layoutClassName='flex-grow-1 w-full'
          className='w-full'
          value={search}
          prefixIcon='search'
          placeholder='Search for types'
        />
        <PrimaryButton className='' onClick={() => {}}>
          Create
        </PrimaryButton>
      </div>
      <ConfigTable />
    </div>
  );
};
export default TypeManager;
