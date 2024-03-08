import { cn } from '@/utils/utils';
import {TextInput, Button, Icon} from '@/components/ui';
import { useState } from 'react';

const Search = ({ className }: { className?: string }) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  return (
    <div
      className={cn(
        'z-40 flex h-full w-full justify-center align-middle items-center mx-2',
        isSearchOpen && 'fixed bottom-0 left-0 right-0 space-x-4 bg-panel-light px-4 py-2 backdrop-blur-lg dark:bg-panel-dark',
        className
      )}
    >
      <TextInput
        placeholder='Search for anything'
        className={cn(
          'absolute left-0 right-6 mx-auto',
          'sm:visible sm:w-5/12 md:w-1/2',
          isSearchOpen ? 'visible z-50 w-[75%]' : 'invisible'
        )}
        prefixIcon='search'
      />
      <div className={cn('z-40 flex w-full justify-start sm:invisible',
                isSearchOpen && 'justify-end')}>
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
