import recordApi from '@/api/record';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { RecordsFilter } from '@/api/record';
import typeApi from '@/api/type';

const   useRecordTemplate = (companyName: string, typeTemplate: string) => {
  const key = ['template', typeTemplate];
  const [recordFilter] = useState<RecordsFilter>({
    searchTerm: '',
    isAsc: false,
    propertyName: null,
    currentPage: 1,
    pageSize: 30
  });
  const { data, error, isLoading } = useQuery(
    key,
    async () => {
      //get all types
      const type = await typeApi.getAllTypes(companyName);

      //list types have template = `typeTemplate`
      const listTypeTemplate = [];
      for (let i = 0; i < type.length; i++) {
        if (type[i].template.name === typeTemplate) {
          listTypeTemplate.push(type[i])
        }
      }

      //result: all records have relation with all types template = `typeTemplate`
      let result: any[] = []
      for (let i = 0; i < listTypeTemplate.length; i++) {
        //list records have relation with 1 type template = `typeTemplate`
        const recordList = await recordApi.getRecords(companyName, listTypeTemplate[i].id, recordFilter);
        for (let k = 0; k < recordList.records.length; k++) {
          //assign value to type
          recordList.records[k].type = listTypeTemplate[i].name
        }
        //merge the arrays
        if (recordList.records.length > 0) {
          result = result.concat(recordList.records)
        }
      }
      return result;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      refetchOnMount: 'always',
      keepPreviousData: true
    }
  );

  if (error) {
    console.error('Error fetching records:', error);
  }

  return { data, error, isLoading, key };
};
export default useRecordTemplate;
