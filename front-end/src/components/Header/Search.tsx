import { Button, Icon, TextInput } from '@/components/ui';
import useClickOutside from '@/hooks/useClickOutside';
import { cn } from '@/utils/utils';
import { useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import SearchHint from './SearchHint';

const Search = ({ className }: { className?: string }) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isShowHint, setIsShowHint] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const searchRef = useRef<HTMLDivElement>(null);
  useClickOutside([searchRef], () => {
    setIsShowHint(false);
    setSearchOpen(false);
  });

  return (
    <div
      className={cn(
        'relative z-40 mx-2 flex h-full w-full items-center justify-center align-middle',
        isSearchOpen && 'fixed inset-0 mx-0 bg-panel-light px-4 py-2 backdrop-blur-lg dark:bg-panel-dark',
        className
      )}
      ref={searchRef}
    >
      <TextInput
        placeholder='Search for anything'
        className={cn(
          'absolute left-0 right-0 top-1/2 mx-auto translate-y-[-50%]',
          'sm:visible sm:w-5/12 md:w-1/2',
          isSearchOpen ? 'visible z-50 w-[75%]' : 'invisible'
        )}
        prefixIcon='search'
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onFocus={() => {
          setIsShowHint(true);
        }}
      />
      {isShowHint && <SearchHint isSearchOpen={isSearchOpen} searchHint={debouncedSearchTerm} />}
      <div className={cn('z-40 flex w-full justify-start sm:invisible', isSearchOpen && 'justify-end')}>
        <Button
          rounded='icon'
          className='h-10 w-10'
          intent='normal'
          onClick={() => {
            setSearchOpen(!isSearchOpen);
          }}
        >
          <Icon name={isSearchOpen ? 'close' : 'search'} size='1rem' />
        </Button>
      </div>
    </div>
  );
};

export default Search;
