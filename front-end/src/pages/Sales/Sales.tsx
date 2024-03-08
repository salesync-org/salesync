import Icon from '@/components/ui/Icon/Icon';
import { useState } from 'react';
import RecordTabs from '../Records/RecordTabs';

const initTabs = [
  { title: 'Leads', href: 'sales/leads' },
  { title: 'Contacts', href: 'sales/contacts' },
  { title: 'Accounts', href: 'sales/accounts' },
  { title: 'Opportunities', href: 'sales/opportunities' },
  { title: 'Products', href: 'sales/products' },
  { title: 'Price Books', href: 'sales/price-books' },
  { title: 'Calendar', href: 'sales/calendar' },
  { title: 'Analytics', href: 'sales/analytics' }
];

const Sales = () => {
  const [tabs, setTabs] = useState(() => {
    const savedTabs = localStorage.getItem('salesTabs');
    return savedTabs ? JSON.parse(savedTabs) : initTabs;
  });
  return (
    <div className='flex items-center overflow-x-auto bg-white px-6'>
      <h1 className='pr-6 text-lg font-normal leading-6'>Sales</h1>
      <RecordTabs tabs={tabs} setTabs={setTabs} name='salesTabs' />
      <Icon name='edit' className='ml-auto' />
    </div>
  );
};
export default Sales;
