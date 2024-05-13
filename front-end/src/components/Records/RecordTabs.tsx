import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { Button, DropDownList, Icon } from '../ui';
import { Pencil } from 'lucide-react';
import TabLayoutModal from '../TabLayoutModal/TabLayoutModal';
// import { LayoutOrder, Type } from '@/type';

interface RecordTabsProps {
  tabs: LayoutType[];
  // setTabs: React.Dispatch<React.SetStateAction<{ title: string; href: string }[]>>;
  name: string;
  currentTab?: string;
  domainName?: string;
}

const RecordTabs = ({ tabs = [], name, domainName = 'sales', currentTab }: RecordTabsProps) => {
  const id = useParams().typeId as string;
  const companyName = useParams().companyName as string;
  const [isSwap, setIsSwap] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateUser, user, isLoading, setUser } = useAuth();
  const tabWidth = 100;
  let visibleTabs = Math.max(0, Math.floor(windowWidth / tabWidth) - 3);
  console.log('visible tab: ' + visibleTabs);
  const tabListShown = tabs.slice(0, visibleTabs);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (user && isSwap) {
        await updateUser(companyName, user);

        setIsSwap(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [companyName, updateUser, isSwap, user]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
      });
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  const layoutOrders = user.settings.layout_order;
  const saleLayoutIndex = layoutOrders.findIndex((layoutOrder: LayoutOrder) => layoutOrder.name === 'Sales');

  const handleDragStart = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.currentTarget.classList.add('opacity-0');
    e.currentTarget.classList.add('dragging');
    setIsDragging(true);
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

      setIsSwap(true);
      setUser(updatedUser);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.currentTarget.classList.remove('opacity-0');
    e.currentTarget.classList.remove('dragging');
    setIsDragging(false);
    localStorage.setItem(name, JSON.stringify(tabs));
  };

  return (
    <nav className='relative h-full w-full max-w-[100vw]'>
      <ul className={`${name}-tabs flex`}>
        {tabListShown.map((tab, index) => {
          return (
            <li
              key={tab.type_id}
              className={`relative min-h-[40px] text-sm leading-5`}
              value={index}
              style={{
                transition: 'all 0.3s ease',
                transform: isDragging ? `translateX(${index * 2}%)` : 'none'
              }}
            >
              <NavLink
                to={`/${companyName}/${domainName}/${tab.type_id}`}
                data-index={index}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                style={{ width: tabWidth }}
                className={({ isActive }) =>
                  cn(
                    'flex h-full cursor-pointer items-center gap-1 truncate border-t-[3px] border-transparent bg-clip-border px-3 py-2 transition-all duration-100 ease-in-out',
                    (isActive || tab.name === currentTab) && 'bg-secondary/40 dark:bg-secondary-dark/40',
                    'hover:border-b-2 hover:border-b-primary hover:bg-secondary/30 focus:border-b-0 active:border-b-0 dark:hover:bg-secondary-dark/30',
                    `${name}-tab`
                  )
                }
              >
                {(tab.type_id === id || tab.name === currentTab) && (
                  <span
                    className={cn('absolute left-[0px] right-[0px] top-0 h-[3px] animate-to-top bg-primary')}
                  ></span>
                )}
                <p className='w-full text-center'>{tab.name}</p>
                {/* <Icon name='expand_more' /> */}
              </NavLink>
            </li>
          );
        })}
        {visibleTabs < tabs.length && (
          <li
            className={`relative min-h-[40px] text-sm leading-5`}
            style={{
              transition: 'all 0.3s ease'
            }}
          >
            <div
              style={{ width: tabWidth }}
              className={cn(
                'flex h-full cursor-pointer items-center gap-1 truncate border-t-[3px] border-transparent bg-clip-border px-3 py-2 transition-all duration-100 ease-in-out',
                'hover:border-b-2 hover:border-b-primary hover:bg-secondary/30 focus:border-b-0 active:border-b-0 dark:hover:bg-secondary-dark/30',
                `${name}-tab`
              )}
              onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
              <p className='w-full text-center'>More</p>
              <Icon name='expand_more' />
            </div>
            <DropDownList className='top-[44px] w-[150px] py-3' open={isMoreOpen} onClose={() => setIsMoreOpen(false)}>
              {tabs.slice(visibleTabs).map((tab) => {
                return (
                  <NavLink
                    key={tab.type_id}
                    to={`/${companyName}/${domainName}/${tab.type_id}`}
                    className='my-1 flex cursor-pointer items-center gap-4 rounded py-2 pl-4 transition-all hover:bg-slate-100/80'
                  >
                    <h3 className='text-base font-normal'>{tab.name}</h3>
                  </NavLink>
                );
              })}
            </DropDownList>
          </li>
        )}
      </ul>
      <Button
        rounded='icon'
        className='absolute right-0 top-[1px] aspect-square rounded-full p-0'
        onClick={() => {
          setIsEditModalOpen(true);
        }}
      >
        <Pencil size='1rem' />
      </Button>
      <TabLayoutModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
      ></TabLayoutModal>
    </nav>
  );
};
export default RecordTabs;
