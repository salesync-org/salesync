import Icon from '@/components/ui/Icon/Icon';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/utils';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';

interface RecordTabsProps {
  tabs: Type[];
  // setTabs: React.Dispatch<React.SetStateAction<{ title: string; href: string }[]>>;
  name: string;
}

const RecordTabs = ({ tabs = [], name }: RecordTabsProps) => {
  const id = useParams().typeId as string;
  const companyName = useParams().companyName as string;
  const { updateUser, user, isLoading, setUser } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) {
        updateUser(companyName, user);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [companyName, updateUser, user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  const layoutOrders = user.settings.layout_order;
  const saleLayoutIndex = layoutOrders.findIndex((layoutOrder) => layoutOrder.name === 'Sales');

  const handleDragStart = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.currentTarget.classList.add('opacity-0');
    e.currentTarget.classList.add('dragging');
  };

  const handleDragOver = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('.dragging') as HTMLAnchorElement;
    const siblings = target.parentElement?.parentElement?.children;

    if (!siblings) return;

    const sibling = [...siblings].find((sibling) => {
      return e.clientX < sibling.getBoundingClientRect().right;
    });

    if (sibling) {
      const from = Number(target.dataset.index);
      const to = Number(sibling.getAttribute('value'));
      const newTabs = [...tabs];
      newTabs.splice(to, 0, newTabs.splice(from, 1)[0]);

      layoutOrders[saleLayoutIndex].types = newTabs;
      const updatedUser = {
        ...user,
        settings: {
          ...user.settings,
          layout_order: layoutOrders
        }
      };

      setUser(updatedUser);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.currentTarget.classList.remove('opacity-0');
    e.currentTarget.classList.remove('dragging');

    localStorage.setItem(name, JSON.stringify(tabs));
  };

  return (
    <nav className='h-full'>
      <ul className={`${name}-tabs flex`}>
        {tabs.map((tab, index) => {
          return (
            <li
              key={tab.type_id}
              className={`-translate-x-[${index * 2}%] relative text-sm leading-5`}
              value={index}
              style={{
                transition: 'all 0.3s ease',
                transform: `translateX(${index * 2}%)`
              }}
            >
              <NavLink
                to={`/${companyName}/sales/${tab.type_id}`}
                data-index={index}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                className={({ isActive }) =>
                  cn(
                    'flex cursor-pointer items-center gap-1 truncate border-t-[3px] border-transparent bg-clip-border px-3 py-2 transition-all duration-100 ease-in-out',
                    isActive && 'bg-secondary/40',
                    'hover:bg-secondary/30',
                    `${name}-tab`
                  )
                }
              >
                {tab.type_id === id && (
                  <span
                    className={cn('absolute left-[-1px] right-[-1px] top-0 h-[3px] animate-to-top bg-primary')}
                  ></span>
                )}
                <p>{tab.name}</p>
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
