import LinkConfigTable, { LinkConfigTableLoading } from '@/components/TypeDetail/LinkConfigTable';
import LinkModal from '@/components/TypeDetail/LinkModal';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Icon from '@/components/ui/Icon/Icon';
import Pagination from '@/components/ui/Pagination/Pagination';
import TextInput from '@/components/ui/TextInput/TextInput';
import useLink from '@/hooks/type-service/useLinks';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const TypeDetailLink = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentLink, setCurrentLink] = useState<TypeRelation | null>(null);
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const [page, setPage] = useState(() => {
    return searchParams.get('page') || '1';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const { id } = useParams<{ id: string }>() as { id: string };
  const { data, isLoading } = useLink(id);

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
      <h2 className='text-lg font-semibold leading-5'>Links</h2>
      <div className='flex gap-2'>
        <TextInput
          className='w-full'
          value={search}
          onChange={handleInputChange}
          prefixIcon='search'
          placeholder='Search for links'
        />
        <PrimaryButton
          onClick={() => {
            setIsModalOpen(true);
            setCurrentLink(null);
          }}
          layoutClassName='flex-shrink-0'
        >
          <Icon name='add' />
          <span>Add Links</span>
        </PrimaryButton>
      </div>
      {isLoading ? (
        <LinkConfigTableLoading />
      ) : (
        <LinkConfigTable data={data} setCurrentLink={setCurrentLink} setModalOpen={setIsModalOpen} />
      )}
      <Pagination totalPages={1} currentPage={1} onPageChange={handleOnPageChange} />
      <LinkModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} currentLink={currentLink} />
    </>
  );
};
export default TypeDetailLink;
