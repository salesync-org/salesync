import useAuth from '@/hooks/useAuth';
import { Grip, Info } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DropDownList, Icon, Tooltip } from '../ui';
import { cn } from '@/utils/utils';
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
      <span
        data-tooltip-id='navigate'
        data-tooltip-content='View Sections'
        data-tooltip-place='bottom-end'
        className='cursor-pointer'
        onClick={() => setOpen(!open)}
      >
        <div className={cn('aspect-square h-fit w-fit rounded-full p-4', open && 'bg-primary/10')}>
          <Grip {...(open ? { color: '#4194f9' } : {})} />
        </div>
      </span>
      <Tooltip show={!open} id='navigate' />
      <Tooltip id='section-explain' />
      <DropDownList className='top-[44px] w-[200px] py-3' open={open} onClose={() => setOpen(false)}>
        <div className='flex space-x-2 align-middle'>
          <h3 className='p-2'>Layout Sections</h3>
          <Info
            className='fill:primary self-center'
            data-tooltip-id='section-explain'
            data-tooltip-content='Manage types in related sections.'
            size='1.3rem'
            data-tooltip-place='left'
          />
        </div>
        {layoutOrders.map((layoutOrder: LayoutOrder) => {
          return (
            <Link
              key={layoutOrder.name}
              to={
                layoutOrder.name === 'Home' || layoutOrder.types.length === 0
                  ? `/${companyName}/section/home`
                  : layoutOrder?.types[0].type_id
                    ? `/${companyName}/section/${layoutOrder.name.toLowerCase().replace(' ', '')}/${layoutOrder?.types[0].type_id}`
                    : `/${companyName}/section/home`
              }
              className='my-1 flex cursor-pointer items-center gap-4 rounded px-2 py-2 transition-all hover:bg-slate-100/80 dark:hover:bg-secondary/10'
            >
              <Icon
                className='grid size-8 place-content-center rounded-md bg-primary-border-secondary p-1 text-xl text-white'
                name={layoutOrder.icon}
              ></Icon>
              <h3 className='text font-[450]'>{layoutOrder.name}</h3>
            </Link>
          );
        })}
      </DropDownList>
    </div>
  );
};
export default NavigationButton;
