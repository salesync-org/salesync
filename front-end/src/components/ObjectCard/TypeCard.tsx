import PrimaryButton from '../ui/Button/PrimaryButton';
import TextButton from '../ui/Button/TextButton';
import DropDown from '../ui/DropDown/DropDown';
import Icon from '../ui/Icon/Icon';
import Item from '../ui/Item/Item';
import Panel from '../ui/Panel/Panel';
import TypeTable from '../ui/Table/TypeTable';
import TextInput from '../ui/TextInput/TextInput';

interface TypeCardProps {
  type: Type;
}

const TypeCard = ({ type }: { type: Type }) => {
  return (
    <Panel className='flex min-h-[400px] flex-col items-center justify-between'>
      <div className='w-full'>
        <div className='flex w-full flex-row items-center gap-1 '>
          <img
            className='h-10 w-10 rounded-sm bg-blue-800'
            src='
https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/case_120.png'
            alt='type'
          />
          <TextInput prefixIcon='search' className='w-full' placeholder={`My ${type.name}`}></TextInput>
          <PrimaryButton onClick={function (): void {}}>New</PrimaryButton>
          <DropDown value=''>
            <Item title='Change Home Card' />
            <Item title='View Card' />
          </DropDown>
        </div>
        <TypeTable types={[type, type]}></TypeTable>
      </div>
      <div className='flex w-full flex-row items-center justify-between border-t border-black'>
        <TextButton
          onClick={() => {
            console.log('first');
          }}
          text='View Report'
        ></TextButton>
        <div className='flex flex-row items-center'>
          <div>As of today at 11:37</div>
          <button className='ml-2 h-fit align-middle'>
            <Icon name='replay'></Icon>
          </button>
        </div>
      </div>
    </Panel>
  );
};

export default TypeCard;
