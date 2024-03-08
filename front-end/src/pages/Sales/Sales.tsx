import Icon from '@/components/ui/Icon/Icon';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import RecordTabs from '../Records/RecordTabs';

const initTabs = [
  { title: 'Leads', href: 'leads' },
  { title: 'Contacts', href: 'contacts' },
  { title: 'Accounts', href: 'accounts' },
  { title: 'Opportunities', href: 'opportunities' },
  { title: 'Products', href: 'products' },
  { title: 'Price Books', href: 'price-books' },
  { title: 'Calendar', href: 'calendar' },
  { title: 'Analytics', href: 'analytics' }
];

const Sales = () => {
  const [tabs, setTabs] = useState(initTabs);
  return (
    <div className='flex items-center overflow-x-auto bg-white px-6'>
      <h1 className='pr-6 text-lg font-normal leading-6'>Sales</h1>
      <RecordTabs tabs={tabs} setTabs={setTabs} />
      <Icon name='edit' className='ml-auto' />
    </div>
  );
};
export default Sales;
