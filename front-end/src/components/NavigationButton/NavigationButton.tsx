import useAuth from '@/hooks/useAuth';
import { Grip } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DropDownList, Icon } from '../ui';
// import { LayoutOrder } from '@/type';

const NavigationButton = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { companyName = '' } = useParams();

  if (!user) {
    return null;
  }

  const layoutOrders = user.settings.layout_order;
  return (
    <div>
      <span className='cursor-pointer' onClick={() => setOpen(!open)}>
        {open ? <Grip /> : <Grip />}
      </span>
      <DropDownList className='top-[40px] w-[320px] py-3' open={open} onClose={() => setOpen(false)}>
        {layoutOrders.map((layoutOrder: LayoutOrder) => {
          return (
            <Link
              key={layoutOrder.name}
              to={`/${companyName}/${layoutOrder.name.toLowerCase()}`}
              className='my-1 flex cursor-pointer items-center gap-4 py-2 transition-all hover:bg-slate-100/80'
            >
              <Icon
                className='grid size-8 place-content-center rounded-md bg-primary-border-secondary p-1 text-xl text-white'
                name={layoutOrder.icon}
              ></Icon>
              <h3 className='text-sm'>{layoutOrder.name}</h3>
            </Link>
          );
        })}
      </DropDownList>
    </div>
  );
};
export default NavigationButton;
