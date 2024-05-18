import { cn } from '@/utils/utils';
import { NavLink } from 'react-router-dom';

export const ItemSetting = ({
  name,
  href,
  className,
  activeClassName
}: {
  name: string;
  href: string;
  className?: string;
  activeClassName?: string;
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'select-none px-5 py-3 text-sm font-medium hover:bg-primary-color/10',
          isActive && 'border-l-[3px] border-primary-color bg-primary-color/20 pl-[15px]',
          className,
          isActive && activeClassName
        )
      }
      to={href}
    >
      {name}
    </NavLink>
  );
};
