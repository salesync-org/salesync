import { DropDown, DropDownItem, TextInput } from '@/components/ui';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import { Button } from '../ui/Button';
import TextButton from '../ui/Button/TextButton';
import Icon from '../ui/Icon/Icon';
import Panel from '../ui/Panel/Panel';

const TypeCard = ({ type }: { type: Type }) => {
  const { showModal } = useGlobalModalContext();

  return (
    <>
      <Panel className='flex min-h-[400px] flex-col items-center justify-between'>
        <div className='w-full'>
          <div className='flex w-full flex-row items-center gap-1 '>
            <div className='flex-grow'>
              <TextInput prefixIcon='search' className='w-full' placeholder={`My ${type.name}`}></TextInput>
            </div>
            <Button
              onClick={async () => {
                showModal(MODAL_TYPES.CREATE_RECORD_MODAL, {
                  typeId: type.id
                });
              }}
            >
              New
            </Button>
            <DropDown value='' header=''>
              <DropDownItem title='Change Home Card' value={''} />
              <DropDownItem title='View Card' value={''} />
            </DropDown>
          </div>
          <div className='mt-3'>{/* <TypeTable types={type}></TypeTable> */}</div>
        </div>
        <div className='flex w-full flex-row items-center justify-between border-t border-input-stroke pt-3 dark:border-input-stroke-dark'>
          <TextButton
            onClick={() => {
              console.log('first');
            }}
            text='View Report'
          ></TextButton>
          <div className='flex flex-row items-center'>
            <div>As of today at 11:37</div>
            <button className='ml-2 h-fit align-middle' onClick={() => {}}>
              <Icon name='replay'></Icon>
            </button>
          </div>
        </div>
      </Panel>
    </>
  );
};

export default TypeCard;
