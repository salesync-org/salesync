import { cn } from '@/utils/utils';
import { NavLink } from 'react-router-dom';
import { Lock } from 'lucide-react';
import LoadingSpinnerSmall from '../ui/Loading/LoadingSpinnerSmall';

export const ItemSetting = ({
  name,
  href,
  className,
  lock,
  loading,
  activeClassName
}: {
  name: string;
  href: string;
  className?: string;
  lock?: boolean;
  loading?: boolean;
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
      <div className='flex justify-between align-middle'>
        <div className='text-sm font-medium'>{name}</div>
        {loading ? (
          <LoadingSpinnerSmall className='h-[1.2rem] w-[1.2rem] opacity-60 ' />
        ) : (
          lock && (
            <div className='ml-auto'>
              <Lock size={'1rem'} />
            </div>
          )
        )}
      </div>
    </NavLink>
  );
};
