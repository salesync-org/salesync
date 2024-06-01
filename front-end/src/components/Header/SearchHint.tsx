/* eslint-disable @typescript-eslint/no-explicit-any */
import recordApi, { RecordsFilter } from '@/api/record';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

type SearchHintProps = {
  searchHint: string;
};

const SearchHint = ({ searchHint }: SearchHintProps) => {
  const { companyName = '' } = useParams();
  const [records, setRecords] = useState<any>(undefined);

  useEffect(() => {
    const fetchRecords = async () => {
      const recordFilters: RecordsFilter = {
        searchTerm: searchHint,
        isAsc: null,
        propertyName: null,
        currentPage: 1,
        pageSize: 300
      };
      const res = await recordApi.getAllRecords(companyName, recordFilters);

      setRecords(res);
    };

    fetchRecords();
  }, [searchHint, companyName]);
  return (
    <div className='absolute w-[60%] rounded-md bg-white py-4 shadow-sm md:top-12'>
      {records?.records.map((record: any) => <SearchCard record={record} key={record.id} />)}
    </div>
  );
};

const SearchCard = ({ record }: { record: any }) => {
  const NUMBER_OF_SECTION_NAME = 4;
  const pathname = useLocation().pathname.split('/').slice(0, NUMBER_OF_SECTION_NAME).join('/');
  return (
    <Link
      to={`${pathname}/record/${record.id}`}
      className='flex w-full items-center justify-between rounded p-1 px-3 py-3 transition-all hover:bg-neutral-50'
    >
      <div className='flex flex-col'>
        <span className='text-sm font-semibold text-gray-500'>{record.name}</span>
      </div>
    </Link>
  );
};
export default SearchHint;
