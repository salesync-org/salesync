import PrimaryButton from 'ui/Button/PrimaryButton';
import Button from 'ui/Button/Button';
import Panel from 'ui/Panel/Panel';
import Switch from 'ui/Switch/Switch';
import Icon from 'ui/Icon/Icon';
import TextInput from 'ui/TextInput/TextInput';
import DropDown from 'ui/DropDown/DropDown';
import Item from 'ui/Item/Item';
import ModalPanel from '../ModalPanel/ModalPanel';

function ComponentPanel() {
  return (
    <Panel>
      <h1 className='mb-5'>UI Component</h1>
      <p>These are all of the predefined UI components to be used in the project.</p>
      <div className='my-6 flex flex-wrap *:mx-8 *:my-6'>
        <div>
          <h2 className='mb-4'>Primary Button</h2>
          <PrimaryButton onClick={function (): void {}} header='Normal' showHeader={true}>
            Primary
          </PrimaryButton>
          <PrimaryButton onClick={function (): void {}} header='Disabled' disabled={true} showHeader={true}>
            Primary
          </PrimaryButton>
          <PrimaryButton onClick={function (): void {}} header='With Icon' showHeader={true}>
            <Icon name='search' />
            <p>Primary</p>
          </PrimaryButton>
        </div>
        <div>
          <h2 className='mb-4'>Secondary Button</h2>
          <Button onClick={function (): void {}} header='Normal' showHeader={true}>
            Secondary
          </Button>
          <Button onClick={function (): void {}} header='Disabled' disabled={true} showHeader={true}>
            Secondary
          </Button>
          <Button onClick={function (): void {}} header='With Icon' showHeader={true}>
            <Icon name='edit' />
            <p>Secondary</p>
          </Button>
        </div>
        <div>
          <h2 className='mb-4'>Toggle Button</h2>
          <Switch header='Normal' onClick={function (): void {}} checked={false} />
          <Switch header='Disabled & Off' disabled onClick={function (): void {}} checked={false} />
          <Switch header='Disabled & On' disabled onClick={function (): void {}} checked={true} />
        </div>
        <div>
          <h2 className='mb-4'>Input Button</h2>
          <TextInput header='Normal' placeholder='Search for something' />
          <TextInput header='With Icon' placeholder='Search for anything' prefixIcon='search' />
          <TextInput header='Disabled' disabled placeholder='Search for nothing' prefixIcon='home' />
        </div>
        <div>
          <h2 className='mb-4'>Input Button</h2>
          <DropDown header='Normal' value='Select a value'>
            <Item title='Item 1' />
            <Item title='Item 2' />
            <Item title='Item 3' />
            <Item title='Item 4' />
          </DropDown>
          <DropDown header='With Complex Items' value='Select a value'>
            <Item icon={<Icon name='person' size='1rem' />} title='Complex' subTitle='With Subtitle' href='#' />
            <Item title='Detailed' subTitle='And Subtitle' additionalInfo='With Additional Info' />
            <Item title='Simple' subTitle='With Subtitle' />
          </DropDown>
        </div>
        <div>
            <h2 className='mb-4'>Modal</h2>
            <ModalPanel />
        </div>
      </div>
      <h5>Comming more.</h5>
    </Panel>
  );
}

export default ComponentPanel;
