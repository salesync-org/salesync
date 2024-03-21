import FieldConfigTable, { FieldConfigTableLoading } from '@/components/TypeDetail/FieldConfigTable';
import FieldModal from '@/components/TypeDetail/FieldModal';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Icon from '@/components/ui/Icon/Icon';
import Pagination from '@/components/ui/Pagination/Pagination';
import TextInput from '@/components/ui/TextInput/TextInput';
import useField from '@/hooks/record-service/useFields';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const TypeDetailField = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [currentLink, setCurrentLink] = useState<TypeRelation | null>(null);
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const [page, setPage] = useState(() => {
    return searchParams.get('page') || '1';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const { id } = useParams<{ id: string }>() as { id: string };

  // change useLink to useField to get data
  const { data, isLoading } = useField(id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (debouncedSearch !== null) {
      searchParams.set('search', e.target.value);
      setSearchParams(searchParams);
    }
  };

  const handleOnPageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    setPage(page.toString());
  };

  return (
    <>
      <h2 className='text-lg font-semibold leading-5'>Fields</h2>
      <div className='flex gap-2'>
        <TextInput
          className='w-full'
          value={search}
          onChange={handleInputChange}
          prefixIcon='search'
          placeholder='Search for fields'
        />
        <PrimaryButton onClick={() => setIsModalOpen(true)} layoutClassName='flex-shrink-0'>
          <Icon name='add' />
          <span>Add Fields</span>
        </PrimaryButton>
      </div>
      {isLoading ? <FieldConfigTableLoading /> : <FieldConfigTable data={data} />}
      <Pagination totalPages={1} currentPage={1} onPageChange={handleOnPageChange} />
      <FieldModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};
export default TypeDetailField;