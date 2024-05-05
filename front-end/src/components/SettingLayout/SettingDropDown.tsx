import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ItemSetting } from './ItemSetting';

export const SettingDropDown = ({ title, items }: { title: string; items: { name: string; path: string }[] }) => {
  const location = useLocation();
  const [open, setOpen] = useState(() => {
    return items.some((item) => location.pathname.includes(item.path));
  });
  const { companyName = '' } = useParams();

  return (
    <div className='flex flex-col'>
      <div
        className='flex cursor-pointer items-center gap-2 px-5 py-3 hover:bg-primary-color/10'
        onClick={() => setOpen(!open)}
      >
        <ChevronRight
          size={16}
          fontFamily='700'
          style={{ transform: open ? 'rotate(90deg)' : '', transition: 'all ease-out 0.1s' }}
        />
        <span className='select-none text-sm font-medium'>{title}</span>
      </div>
      {open && (
        <div className='flex flex-col'>
          {items.map((item, _) => (
            <ItemSetting
              className='pl-12'
              activeClassName='pl-[40px]'
              key={item.name}
              name={item.name}
              href={`/${companyName}/${item.path}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
