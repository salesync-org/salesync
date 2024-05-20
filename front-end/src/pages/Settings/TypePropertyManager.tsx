import typeApi from '@/api/type';
import { Button } from '@/components/ui';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Icon from '@/components/ui/Icon/Icon';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';
import '@/constants/api';
import useDebounce from '@/hooks/useDebounce';
import { cn } from '@/utils/utils';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import typeApi from '@/api/type';
// import { Button } from '@/components/ui';
// import { ArrowLeft } from 'lucide-react';
// import { cn } from '@/utils/utils';
import CreateTypeRelationModal from '@/components/CreateTypeRelationModal/CreateTypeRelationModal';
import TypePropertyTable from '@/components/ui/Table/TypePropertyTable';
import TypeRelationTable from '@/components/ui/Table/TypeRelationTable';
import StageSetting from './StageSetting';
import { useQueryClient } from 'react-query';

const TypePropertyManager = () => {
  const { companyName, typeId } = useParams();
  const [typeProperties, setTypeProperties] = useState<TypeDetail>();
  const [typeRelations, setTypeRelations] = useState<TypeRelation[]>();
  const [relationSearchResult, setRelationSearchResult] = useState<TypeRelation[]>([]);
  const [propertySearchResult, setPropertySearchResult] = useState<TypePropertyDetail[]>([]);
  const [createRelation, setCreateRelation] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const debouncedSearch = useDebounce(search, 500);
  const queryClient = useQueryClient();
  const fetchData = async () => {
    const properties = await typeApi.loadTypeDetail(companyName ?? '', typeId ?? '');
    const relations = await typeApi.getTypeRelations(companyName ?? '', typeId ?? '');
    setTypeProperties(properties);
    setPropertySearchResult(properties.properties);
    setTypeRelations(relations);
    setRelationSearchResult(relations);
  };

  useEffect(() => {
    // Fetch sample data

    fetchData();
  }, [companyName, typeId]);

  //Search for types
  useEffect(() => {
    const handleSearchType = () => {
      const searchResult =
        typeProperties &&
        typeProperties.properties.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(debouncedSearch.toLowerCase());
        });

      return searchResult;
    };

    const handleSearchRelations = () => {
      const searchResult =
        typeRelations &&
        typeRelations.filter((item) => {
          return Object.values(item.destination_type_label)
            .join('')
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());
        });

      return searchResult;
    };

    if (debouncedSearch || debouncedSearch === '') {
      searchParams.set('search', debouncedSearch);
      setSearchParams(searchParams);
      if (searchParams.get('tab') === 'properties') setPropertySearchResult(handleSearchType() as TypePropertyDetail[]);
      if (searchParams.get('tab') === 'relations') setRelationSearchResult(handleSearchRelations() as TypeRelation[]);
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
              {(typeProperties?.template.name === 'StageObject'
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
          {(searchParams.get('tab') == 'properties' || searchParams.get('tab') === null) && (
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
              <div className='h-full min-h-full overflow-y-hidden'>
                <TypePropertyTable
                  propertyDetailList={propertySearchResult}
                  onPropertyDelete={async (id) => {
                    await typeApi.deleteTypeProperty(companyName ?? '', id);
                    setPropertySearchResult((prev) => prev.filter((item) => item.id !== id));
                  }}
                  onPropertyEdit={async (property) => {
                    if (property === null) {
                      return;
                    }
                    await typeApi.updateTypeProperty(companyName ?? '', property);
                    fetchData();
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
                    placeholder='Search for relations'
                    prefixIcon='search'
                  />
                </div>
                <PrimaryButton
                  className='ml-2'
                  onClick={() => {
                    setCreateRelation(true);
                  }}
                  showHeader={true}
                >
                  <Icon name='edit' />
                  <p>Create</p>
                </PrimaryButton>
              </div>
              <div className='h-full min-h-full overflow-y-hidden'>
                <TypeRelationTable relationList={relationSearchResult} />
              </div>
            </>
          )}
          {searchParams.get('tab') == 'stages' && (
            <div className='row-span-2 h-full pb-16'>
              <StageSetting typeId={typeId ?? ''}></StageSetting>
            </div>
          )}
        </div>
      </Panel>
      {createRelation && (
        <CreateTypeRelationModal
          typeId={typeId ?? ''}
          isOpen={createRelation}
          onCreate={async (typeRelation) => {
            const res = await typeApi.createTypeRelation(companyName ?? '', typeRelation);
            if (res) {
              setTypeRelations((prev) => [...(prev ?? []), typeRelation]);
              setRelationSearchResult((prev) => [...prev, typeRelation]);
              await fetchData();
            }
            setCreateRelation(false);
          }}
          onClose={() => {
            setCreateRelation(false);
          }}
        ></CreateTypeRelationModal>
      )}
    </div>
  );
};

export default TypePropertyManager;
