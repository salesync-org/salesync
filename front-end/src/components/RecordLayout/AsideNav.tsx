import { cn } from '@/utils/utils';
import { NavLink } from 'react-router-dom';
import Icon from '../ui/Icon/Icon';

const asideItems = [
  { icon: 'home', href: '/home', title: 'Home' },
  { icon: 'monitoring', href: '/sales', title: 'Sales', active: true },
  { icon: 'ecg_heart', href: '/services', title: 'Services' },
  { icon: 'mail', href: '/outreach', title: 'Outreach' },
  { icon: 'shopping_cart', href: '/commerce', title: 'Commerce' },
  { icon: 'domain', href: '/your-account', title: 'Your account' }
];

const AsideNav = () => {
  return (
    <aside className='fixed grid min-h-dvh w-[76px] justify-center bg-[#014486] text-white'>
      <nav className='p-1'>
        <ul className='flex flex-col gap-1'>
          {asideItems.map((item) => (
            <li key={item.title}>
              <AsideItem {...item} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const AsideItem = ({
  icon,
  href,
  title,
  className
}: {
  icon: string;
  href: string;
  title: string;
  active?: boolean;
  className?: string;
}) => {
  return (
    <NavLink
      to={href}
      title={title}
      className={({ isActive }) =>
        cn(
          'flex h-16 w-16 flex-col items-center justify-center rounded-[8px]  text-center text-sm leading-5',
          'hover:rounded-[8px] hover:border-[2px] hover:border-white/50',
          isActive && 'border-[2px] border-white',
          className
        )
      }
    >
      <Icon name={icon} size='32px' />
      <span className='mt-1 w-full truncate px-[2px] text-[10px] leading-4'>{title}</span>
    </NavLink>
  );
};

export default AsideNav;
