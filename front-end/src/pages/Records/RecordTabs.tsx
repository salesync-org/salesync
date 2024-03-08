import Icon from '@/components/ui/Icon/Icon';
import { cn } from '@/utils/utils';
import { NavLink, useLocation } from 'react-router-dom';

interface RecordTabsProps {
  tabs: { title: string; href: string }[];
  setTabs: React.Dispatch<React.SetStateAction<{ title: string; href: string }[]>>;
}

const RecordTabs = ({ tabs, setTabs }: RecordTabsProps) => {
  const location = useLocation();
  return (
    <nav>
      <ul className='flex'>
        {tabs.map((tab, index) => {
          return (
            <li key={index} className='relative text-sm leading-5'>
              <NavLink
                to={tab.href}
                className={({ isActive }) =>
                  cn(
                    'flex cursor-pointer items-center gap-1 truncate border-t-[3px] border-transparent bg-clip-border px-3 py-2 transition-all duration-100 ease-in-out hover:bg-[#0070d2]/10',
                    isActive && 'bg-[#0070d2]/10',
                    'hover:bg-[#0070d2]/10'
                  )
                }
              >
                {location.pathname.split('/').pop() === tab.href && (
                  <span
                    className={cn('animate-to-top absolute left-[-1px] right-[-1px] top-0 h-[3px] bg-[#0070d2]')}
                  ></span>
                )}
                {tab.title}
                <Icon name='expand_more' />
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default RecordTabs;
