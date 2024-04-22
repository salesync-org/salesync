import Button from '@/components/ui/Button/Button';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import DropDown from '@/components/ui/DropDown/DropDown';
import Icon from '@/components/ui/Icon/Icon';
import Item from '@/components/ui/Item/Item';
import '@/constants/api';
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from '@/components/ui/Pagination/Pagination';
import Panel from '@/components/ui/Panel/Panel';
import TypeTable from '@/components/ui/Table/TypeTable';
import TextInput from '@/components/ui/TextInput/TextInput';
import '@/constants/api';
import useType from '@/hooks/type-service/useType';
import typeApi from '@/api/type';
import { DropDownItem } from '@/components/ui';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';

const ObjectManager = () => {
  const { companyName } = useParams();
  //List of types
  const { types } = useType();
  //List of types after search
  const [typeSearchResult, setTypeSearchResult] = useState<Type[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newType, setNewType] = useState<Type | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(() => {
    return searchParams.get('page') || '1';
  });

  useEffect(() => {
    // Fetch sample data
    const fetchData = async () => {
      setTypeSearchResult(types ?? []);
      const templateResult: Template[] = await typeApi.getAllTemplates(companyName ?? '');
      setTemplates(templateResult);
    };

    fetchData();
  }, [types, companyName]);

  //Search for types
  useEffect(() => {
    const handleSearch = () => {
      const searchResult =
        types &&
        types.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(debouncedSearch.toLowerCase());
        });

      return searchResult;
    };

    if (debouncedSearch || debouncedSearch === '') {
      searchParams.set('search', debouncedSearch);
      setSearchParams(searchParams);
      setTypeSearchResult(handleSearch() as Type[]);
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  //create Type sample data and add to types
  const handleCreateType = async () => {
    try {
      const res = await typeApi.createType(companyName ?? '', newType ?? {});
      if (res) {
        console.log('Create Type successfully');
        setTypeSearchResult([res, ...(types || [])]);
        return res;
      }
    } catch (error) {
      console.error('Create Type failed', error);
    }
  };

  //Handle submit when creating new type
  const handleSubmit = () => {
    if (!newType) {
      return;
    }
    setNewType(null);
    handleCreateType();
  };

  //Handle page change
  const handleOnPageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    setPage(page.toString());
  };
  return (
    <div className='h-full w-full'>
      <Panel className='m-0 h-full'>
        <div className='grid-col-1 grid h-full w-full grid-rows-[48px_1fr]'>
          <div className='mb-10 flex h-fit flex-row justify-between'>
            <div className='flex-grow'>
              <TextInput
                onChange={(e) => setSearch(e.target.value)}
                className='w-full'
                value={search}
                placeholder='Search for types'
                prefixIcon='search'
              />
            </div>
            <PrimaryButton
              className='ml-2'
              onClick={() => {
                setNewType({ id: '', name: '', template: { id: '', name: '' } });
              }}
              showHeader={true}
            >
              <Icon name='edit' />
              <p>Create</p>
            </PrimaryButton>
          </div>
          <div className='h-full min-h-full overflow-scroll'>
            {typeSearchResult ? (
              <TypeTable types={typeSearchResult}></TypeTable>
            ) : (
              <div className='flex h-full items-center justify-center'>
                <LoadingSpinner />
              </div>
            )}
          </div>

          <div className='hidden'>
            <Pagination totalPages={15} currentPage={+page} onPageChange={handleOnPageChange} />
          </div>
        </div>
      </Panel>

      <Modal
        isOpen={newType != null}
        onClose={() => {
          setNewType(null);
        }}
        title='Create new Type'
      >
        <form>
          <div className='grid grid-cols-5 place-content-center gap-3'>
            <div className='col-span-3 flex flex-col'>
              <TextInput
                onChange={(e) =>
                  setNewType({
                    id: '',
                    template: newType?.template ?? { id: '', name: '' },
                    name: e.target.value ?? ''
                  })
                }
                header='Type Name'
                className='w-full'
                value={newType?.name ?? ''}
                placeholder='Search for something'
              />
            </div>
            <div className='col-span-2 flex flex-col'>
              <DropDown
                header='Template'
                defaultValue='Select a Template'
                className='w-full'
                value={newType?.template.name ?? ''}
                onValueChange={(value) => {
                  console.log('value is' + value);
                  setNewType({
                    template: templates.find((template) => template.id == value) ?? { id: '', name: '' },
                    id: '',
                    name: newType?.name ?? ''
                  });
                }}
              >
                {templates.map((template) => (
                  <DropDownItem key={template.id + '_1'} title={template.name} value={template.id}>
                    <Item key={template.id} title={template.name} value={template.id} />
                  </DropDownItem>
                ))}
              </DropDown>
            </div>
          </div>
          <ModalFooter className='mt-8'>
            <Button onClick={() => setNewType(null)}>Cancel</Button>
            <PrimaryButton onClick={() => handleSubmit()}>Save</PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default ObjectManager;
