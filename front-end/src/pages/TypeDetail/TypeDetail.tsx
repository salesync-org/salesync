import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Icon from '@/components/ui/Icon/Icon';
import Pagination from '@/components/ui/Pagination/Pagination';
import LinkConfigTable, { LinkConfigTableLoading } from '@/components/TypeDetail/LinkConfigTable';
import TextInput from '@/components/ui/TextInput/TextInput';
import { testData } from '@/constant/constant';
import useDebounce from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import LinkModal from '@/components/TypeDetail/LinkModal';
import typeApi from '@/api/typeApi';
import useRelation from '@/hooks/useRelation';

const TypeDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const [page, setPage] = useState(() => {
    return searchParams.get('page') || '1';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useRelation(id as string);

  const handleOnPageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    setPage(page.toString());
  };

  return (
    <div className='mx-auto flex w-full max-w-[676px] flex-col gap-6 rounded-md bg-panel-light px-6 py-5 dark:bg-panel-dark'>
      <div className='flex items-center text-link-text-light dark:text-link-text-dark'>
        <Icon name='chevron_left' />
        <Link to='#' className='text-sm leading-4 underline'>
          Go back
        </Link>
      </div>
      <h1 className='text-2xl font-bold leading-7'>Account Type</h1>
      <h2 className='text-lg font-semibold leading-5'>Links</h2>
      <div className='flex gap-2'>
        <TextInput
          layoutClassName='flex-grow-1 w-full'
          className='w-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefixIcon='search'
          placeholder='Search for links'
        />
        <PrimaryButton onClick={() => setIsModalOpen(true)} layoutClassName='flex-shrink-0'>
          <Icon name='add' />
          <span>Add Links</span>
        </PrimaryButton>
      </div>
      {true ? <LinkConfigTableLoading /> : <LinkConfigTable data={data} />}
      <Pagination totalPages={15} currentPage={+page} onPageChange={handleOnPageChange} />
      <LinkModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};
export default TypeDetail;
