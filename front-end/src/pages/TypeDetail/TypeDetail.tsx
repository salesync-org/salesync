import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Icon from '@/components/ui/Icon/Icon';
import Pagination from '@/components/ui/Pagination/Pagination';
import LinkConfigTable from '@/components/ui/Table/ConfigTable';
import TextInput from '@/components/ui/TextInput/TextInput';
import { testData } from '@/constants/constant';
import useDebounce from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const TypeDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const [page, setPage] = useState(() => {
    return searchParams.get('page') || '1';
  });
  const [data, setData] = useState<Link[]>(() => {
    return testData as Link[];
  });
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const handleSearch = () => {
      const searchResult = testData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(debouncedSearch.toLowerCase());
      });

      return searchResult;
    };

    if (debouncedSearch || debouncedSearch === '') {
      searchParams.set('search', debouncedSearch);
      setSearchParams(searchParams);
      setData(handleSearch() as Link[]);
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

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
        <PrimaryButton onClick={() => {}} layoutClassName='flex-shrink-0'>
          <Icon name='add' />
          <span>Add Links</span>
        </PrimaryButton>
      </div>
      <LinkConfigTable data={data} />
      <Pagination totalPages={15} currentPage={+page} onPageChange={handleOnPageChange} />
    </div>
  );
};
export default TypeDetail;
