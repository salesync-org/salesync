import { cn } from '@/utils/utils';
import { NavLink } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const ItemSetting = ({
  name,
  href,
  className,
  lock,
  activeClassName
}: {
  name: string;
  href: string;
  className?: string;
  lock?: boolean;
  activeClassName?: string;
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'select-none px-5 py-3 hover:bg-primary-color/10',
          isActive && 'border-l-[3px] border-primary-color bg-primary-color/20 pl-[15px]',
          className,
          isActive && activeClassName
        )
      }
      to={href}
    >
      <div className='flex justify-between'>
        <div className='text-sm font-medium'>{name}</div>
        {lock && (
          <div className='ml-auto'>
            <Lock size={'1rem'} />
          </div>
        )}
      </div>
    </NavLink>
  );
};
