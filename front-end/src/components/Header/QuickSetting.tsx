import { useState } from 'react';
import { Button, Icon } from '../ui';
import { Link } from 'react-router-dom';

const QuickSetting = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <Button
        rounded='icon'
        className='h-10 w-10'
        intent='normal'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Icon name='settings' size='1rem' />
      </Button>
      <nav className='fixed bottom-0 right-0 top-[104px] flex w-[400px] flex-col gap-6 rounded-sm bg-white shadow-2xl'>
        <div className='flex items-center justify-between border-b px-6 py-3'>
          <h2 className='text-base font-normal leading-5'>Quick Settings</h2>
          <Icon name='close' size='1rem' className='cursor-pointer hover:text-primary-color' />
        </div>
        <div className='flex flex-col gap-4 px-6'>
          <Button
            intent='normal'
            className='flex h-8 items-center gap-1 border border-primary-color py-0 text-primary-color shadow-primary-color hover:shadow-md'
          >
            <span className='text-sm'>Open Advanced Setup</span>
            <Icon name='open_in_new' />
          </Button>
          <section>
            <h3 className='mb-2 font-bold leading-8'>Customization</h3>
            <ul>
              <li>
                <QuickSettingItem icon='edit_document' title='Fields' desc='Create a custom input field.' href='#' />
              </li>
              <li>
                <QuickSettingItem
                  icon='keyboard_double_arrow_right'
                  title='Sales Stages'
                  desc='Customize stages to match your process.'
                  href='#'
                />
              </li>
            </ul>
          </section>
          <section>
            <h3 className='mb-2 font-bold leading-8'>Company</h3>
            <ul>
              <li>
                <QuickSettingItem icon='person_add' title='Users' desc='Add and manage users.' href='#' />
              </li>
              <li>
                <QuickSettingItem
                  icon='corporate_fare'
                  title='Business Details'
                  desc='Update your company name and contact info.'
                  href='#'
                />
              </li>
              <li>
                <QuickSettingItem
                  icon='schedule'
                  title='Fiscal Year'
                  desc='Set the fiscal year for your organization.'
                  href='#'
                />
              </li>
              <li>
                <QuickSettingItem
                  icon='domain'
                  title='Billing and Purchases'
                  desc='Manage your subscription with Your Account.'
                  href='#'
                />
              </li>
            </ul>
          </section>
        </div>
      </nav>
    </div>
  );
};

const QuickSettingItem = ({
  icon,
  title,
  desc,
  onClick = () => {}
}: {
  icon: string;
  title: string;
  desc: string;
  href: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className='group flex cursor-pointer items-center gap-3 rounded-sm p-2 hover:bg-primary-color/10 hover:shadow-sm'
      onClick={onClick}
    >
      <Icon name={icon} className='grid h-8 w-8 place-content-center rounded-full bg-blue-800 text-white' />
      <div>
        <h3 className='text-sm font-bold leading-5 text-primary-color group-hover:underline'>{title}</h3>
        <p className='text-xs text-gray-400'>{desc}</p>
      </div>
    </div>
  );
};

export default QuickSetting;
