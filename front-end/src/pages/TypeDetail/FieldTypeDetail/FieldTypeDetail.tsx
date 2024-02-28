import TextInput from '@/components/ui/TextInput/TextInput';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AddFieldModal from '../ModalTypeDetail/AddFieldModal';

const FieldTypeDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });

  return (
    <>
      <h2 className='text-lg font-semibold leading-5'>Fields</h2>
      <div className='flex gap-2'>
        <TextInput
          layoutClassName='flex-grow-1 w-full'
          className='w-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefixIcon='search'
          placeholder='Search for Fields'
        />
        <div className='flex-shrink-0'>
          <AddFieldModal nameType='Account' />
        </div>
      </div>
    </>
  );
};
export default FieldTypeDetail;
