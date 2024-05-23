import { Link } from 'react-router-dom';
import { record } from 'zod';

type SearchHintProps = {
  searchHint: string;
};

const SearchHint = ({ searchHint }: SearchHintProps) => {
  return (
    <div className='absolute w-[60%] rounded-md bg-white py-4 shadow-sm md:top-12'>
      <SearchCard />
      <SearchCard />
      <SearchCard />
    </div>
  );
};

const SearchCard = ({ record }: { record?: RecordResponse }) => {
  return (
    <Link
      to='/'
      className='flex w-full items-center justify-between rounded p-1 px-3 py-1 transition-all hover:bg-neutral-50'
    >
      <div className='flex flex-col'>
        <span className='text-sm font-semibold text-gray-500'>đâsdsa</span>
        <span className='text-xs text-gray-400'>dsdsa</span>
      </div>
    </Link>
  );
};
export default SearchHint;
