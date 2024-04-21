import typeApi from '@/api/type';
import { Button, Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Icon from '@/components/ui/Icon/Icon';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';
import '@/constants/api';
import useDebounce from '@/hooks/useDebounce';
import { cn } from '@/utils/utils';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const TypePropertyManager = () => {
  // const [typeName, setTypeName] = useState('');
  const { companyName, typeId } = useParams();
  //List of types
  const [typeProperties, setTypeProperties] = useState<TypeDetail>();
  //List of types after search
  const [propertySearchResult, setPropertySearchResult] = useState<TypePropertyDetail[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // Fetch sample data
    const fetchData = async () => {
      const properties = await typeApi.loadTypeDetail(companyName ?? '', typeId ?? '');
      console.log('result');
      setTypeProperties(properties);
      setPropertySearchResult(properties.properties);
    };

    fetchData();
  }, []);

  //Search for types
  useEffect(() => {
    const handleSearch = () => {
      const searchResult =
        typeProperties &&
        typeProperties.properties.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(debouncedSearch.toLowerCase());
        });

      return searchResult;
    };

    if (debouncedSearch || debouncedSearch === '') {
      searchParams.set('search', debouncedSearch);
      setSearchParams(searchParams);
      setPropertySearchResult(handleSearch() as TypePropertyDetail[]);
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  return (
    <div className='h-full w-full'>
      <Panel className='m-0 h-full'>
        <div className='grid-col-1 grid h-full w-full grid-rows-[48px_1fr]'>
          <div className='mb-10 flex h-fit flex-row justify-between'>
            <div className='mr-2 h-10 w-10'>
              <Button
                rounded
                className={cn('aspect-ratio h-10 w-10 rounded-full p-0')}
                onClick={() => {
                  navigate(`/${companyName}/setting/object-manager`);
                }}
              >
                <ArrowLeft size='1rem' />
              </Button>
            </div>
            <div className='flex-grow'>
              <TextInput
                onChange={(e) => setSearch(e.target.value)}
                className='w-full'
                value={search}
                placeholder='Search for properties'
                prefixIcon='search'
              />
            </div>
            <PrimaryButton
              className='ml-2'
              onClick={() => {
                navigate(`/${companyName}/setting/object-manager/${typeId}/create`);
              }}
              showHeader={true}
            >
              <Icon name='edit' />
              <p>Create</p>
            </PrimaryButton>
          </div>
          <div className='h-full min-h-full overflow-scroll'>
            <div className='h-full overflow-y-scroll rounded border-2 border-input-stroke-light dark:border-input-stroke-dark'>
              <Table className='h-full'>
                <TableHeader className='max-h-full rounded-sm border-b-2 border-input-stroke-light dark:border-input-stroke-dark'>
                  <TableRow className='left-0 right-0 bg-slate-50 dark:bg-secondary/10'>
                    <TableCell className='max-w-28 font-semibold'>Property Name</TableCell>
                    <TableCell className='font-semibold'>Property Label</TableCell>
                    <TableCell className='font-semibold'>Property Type</TableCell>
                    <TableCell className=''></TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className='h-full overflow-y-scroll'>
                  {propertySearchResult &&
                    propertySearchResult.map((property, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className='max-w-28'>{property.name}</TableCell>
                          <TableCell className='max-w-28'>{property.label}</TableCell>
                          <TableCell className='max-w-28'>{property.property.name}</TableCell>
                          <TableCell className='flex w-full max-w-28 justify-end space-x-4'>
                            <Button rounded className='aspect-square rounded-full p-0'>
                              <Pencil size={'1rem'}></Pencil>
                            </Button>
                            <Button
                              rounded
                              className='aspect-square rounded-full p-0'
                              onClick={async () => {
                                await typeApi.deleteTypeProperty(companyName ?? '', property.id);
                                setPropertySearchResult((prev) => prev.filter((item) => item.id !== property.id));
                              }}
                            >
                              <Trash2 size={'1rem'}></Trash2>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default TypePropertyManager;
