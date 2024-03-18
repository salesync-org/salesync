import RecordTable from '@/components/Records/RecordTable';
import { ButtonGroup, DropDown } from '@/components/ui';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';
import { tableButtons } from '@/constants/layout/table-buttons';
import { useGlobalModalContext } from '@/context/GlobalModalContext';
import icon from 'assets/type-icon/lead_icon.png';
import { useParams } from 'react-router-dom';

interface RecordSectionProps {
  type: Type | undefined;
}

const RecordSection = ({ type }: RecordSectionProps) => {
  const { showModal } = useGlobalModalContext();
  const { typeId } = useParams();

  if (!type || !typeId) {
    return null;
  }

  const tableButton = tableButtons.find((button) => button.name === type.name);

  return (
    <Panel className='m-0 h-full overflow-hidden p-4'>
      <section className='px flex items-center justify-between pt-4'>
        <div className='flex items-center gap-2'>
          <div className='w-fit cursor-pointer overflow-hidden rounded-sm bg-primary-color'>
            <img className='h-10 w-10' src={icon} alt={`Icon for ${type.name}`} />
          </div>
          <div>
            <h5 className='leading-[10px]'>{type.name}</h5>
            <div className='flex cursor-pointer items-center space-x-2 border-b border-transparent text-[#080707] hover:border-black'>
              <h1 className='text-[1.3rem]'>All Open {type.name}</h1>
              <Icon name='arrow_drop_down' size='32px' />
            </div>
          </div>
        </div>
        <ButtonGroup>
          {tableButton &&
            tableButton.buttons.map((button) => {
              return (
                <Button
                  key={button.name}
                  intent='normal'
                  zoom={false}
                  onClick={() => {
                    showModal(button.modalName, { typeId });
                  }}
                >
                  {button.name}
                </Button>
              );
            })}
        </ButtonGroup>
      </section>
      <section className='my-2 flex items-center justify-between'>
        <ul className='flex gap-1 leading-[18px]'>
          <li className='truncate'>• Sorted by Name</li>
          <li className='truncate'>
            • Filtered by All {type.name} - {type.name} Status
          </li>
          <li className='truncate'>• Updated 8 minutes ago</li>
        </ul>
        <div className='flex items-center space-x-1'>
          <TextInput placeholder='Search this list...' prefixIcon='search' />
          <div className='hidden space-x-1 md:flex'>
            <DropDown
              value=''
              defaultValue=''
              className='space-x-0 px-3'
              prefixIcon={<Icon name='settings' />}
              suffixIcon={<Icon name='expand_more' />}
              children={undefined}
            ></DropDown>
            <DropDown
              value=''
              defaultValue=''
              className='space-x-0 px-3'
              prefixIcon={<Icon name='table' />}
              suffixIcon={<Icon name='expand_more' />}
              children={undefined}
            ></DropDown>
            <Button className='aspect-square'>
              <Icon name='replay' />
            </Button>
            <Button className='aspect-square'>
              <Icon name='edit' />
            </Button>
            <Button className='aspect-square'>
              <Icon name='pie_chart' />
            </Button>
            <Button className='aspect-square'>
              <Icon name='filter_alt' />
            </Button>
          </div>
        </div>
      </section>
      <div className='-mx-4 mt-4'>
        <RecordTable typeId={typeId} />
      </div>
    </Panel>
  );
};
export default RecordSection;
