import { useEffect, useState } from 'react';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';
import useDebounce from '@/hooks/useDebounce';
import Icon from '@/components/ui/Icon/Icon';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import '@/constants/api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import typeApi from '@/api/type';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/utils/utils';
import TypePropertyTable from '@/components/ui/Table/TypePropertyTable';
import StageSetting from './StageSetting';
import TypeRelationTable from '@/components/ui/Table/TypeRelationTable';

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
        <div className='grid-col-1 grid h-full w-full grid-rows-[48px_52px_1fr]'>
          <div className='mb-5 flex h-full flex-row items-center justify-start'>
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
            <div className='my-2 flex w-full space-x-2 rounded-md p-2 '>
              {(typeProperties?.template === 'StageObject'
                ? ['Properties', 'Relations', 'Stages']
                : ['Properties', 'Relations']
              ).map((item, index) => {
                return (
                  <p
                    key={index}
                    className={cn(
                      'rounded-sm border-[0px] border-primary px-4 py-2 font-semibold dark:border-secondary dark:bg-panel-dark',
                      'cursor-pointer transition-all duration-75 hover:bg-primary/10',
                      item === 'Properties' ? 'bg-panel' : '',
                      searchParams.get('tab') === item.toLowerCase()
                        ? 'rounded-bl-none rounded-br-none border-b-2 text-primary dark:text-secondary'
                        : 'bg-panel  active:border-b-2'
                    )}
                    onClick={() => {
                      navigate(`/${companyName}/setting/object-manager/${typeId}?tab=${item.toLowerCase()}`);
                    }}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
          {searchParams.get('tab') == 'properties' && (
            <>
              <div className='my-2 flex h-fit flex-row justify-between'>
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
                <TypePropertyTable
                  propertyDetailList={propertySearchResult}
                  onPropertyDelete={async (id) => {
                    await typeApi.deleteTypeProperty(companyName ?? '', id);
                    setPropertySearchResult((prev) => prev.filter((item) => item.id !== id));
                  }}
                />
              </div>
            </>
          )}
          {searchParams.get('tab') == 'relations' && (
            <>
              <div className='my-2 flex h-fit flex-row justify-between'>
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
                <TypeRelationTable
                  propertyDetailList={propertySearchResult}
                  onPropertyDelete={async (id) => {
                    await typeApi.deleteTypeProperty(companyName ?? '', id);
                    setPropertySearchResult((prev) => prev.filter((item) => item.id !== id));
                  }}
                />
              </div>
            </>
          )}
          {searchParams.get('tab') == 'stages' && <StageSetting typeId={typeId ?? ''}></StageSetting>}
        </div>
      </Panel>
    </div>
  );
};

export default TypePropertyManager;
