import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { Button, DropDownList, Icon } from '../ui';
import { Pencil } from '@/components/SaleSyncIcons';
import TabLayoutModal from '../TabLayoutModal/TabLayoutModal';
import useType from '@/hooks/type-service/useType';
import { X } from 'lucide-react';
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
  const { types = [] } = useType();
  const companyName = useParams().companyName as string;
  const { recordId } = useParams();
  const [isSwap, setIsSwap] = useState(false);
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateUser, user, isLoading, setUser } = useAuth();
  const tabWidth = 100;
  let visibleTabs = Math.max(0, Math.floor(windowWidth / tabWidth) - 3);
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
    if (tabs.find((tab) => tab.type_id === id) === undefined) {
      addTypeToList(id);
    }
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
  const saleLayoutIndex = layoutOrders.findIndex(
    (layoutOrder: LayoutOrder) => layoutOrder.name.toLowerCase() === domainName.toLowerCase()
  );

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

  const addTypeToList = async (newTypeId: string) => {
    const newType = types.find((type) => type.id === newTypeId);
    let newTypeLayout: LayoutType;

    if (newType === undefined) {
      if (recordId) {
        newTypeLayout = {
          type_id: recordId,
          name: currentTab ?? `Record${recordId.slice(0, 2)}`,
          isPrimitiveType: false
        };
        if (tabs.find((tab) => tab.isPrimitiveType == false && tab.type_id === recordId)) {
          return;
        }
      } else {
        return;
      }
    } else {
      newTypeLayout = {
        type_id: newType?.id ?? '',
        name: newType?.name ?? ''
      };
    }
    const newLayoutOrders = layoutOrders.map((layoutOrder: LayoutOrder) => {
      if (layoutOrder.name.toLowerCase() === domainName) {
        const newTypes = [...layoutOrder.types, newTypeLayout];
        return { ...layoutOrder, types: newTypes };
      }
      return layoutOrder;
    });
    setUser({ ...user, settings: { ...user.settings, layout_order: newLayoutOrders } });
  };

  const removeRecordTab = (recordId: string) => {
    const newLayoutOrders = layoutOrders.map((layoutOrder) => {
      if (layoutOrder.name.toLowerCase() === 'sales') {
        return {
          ...layoutOrder,
          types: layoutOrder.types.filter((type) => type.type_id !== recordId)
        };
      }
      return layoutOrder;
    });
    navigate(`/${companyName}/section/${domainName}/${tabs[0].type_id}`);
    const newUser = { ...user, settings: { ...user.settings, layout_order: newLayoutOrders } };
    setUser(newUser);
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
                to={
                  tab.isPrimitiveType === false
                    ? `/${companyName}/record/${tab.type_id}`
                    : `/${companyName}/section/${domainName}/${tab.type_id}`
                }
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
                    isActive && tab.isPrimitiveType === false && 'bg-panel-dark/5 dark:bg-panel-light/5',
                    'hover:border-b-2 hover:border-b-primary hover:bg-secondary/30 focus:border-b-0 active:border-b-0 dark:hover:bg-secondary-dark/30',
                    tab.isPrimitiveType === false &&
                      'hover:border-b-panel-dark hover:bg-panel-dark/10  dark:hover:border-b-panel-light dark:hover:bg-panel-light/20',
                    `${name}-tab`
                  )
                }
              >
                {((tab.isPrimitiveType != false && tab.type_id === id) ||
                  (tab.isPrimitiveType != false && tab.name === currentTab) ||
                  (tab.isPrimitiveType === false && tab.type_id === recordId)) && (
                  <span
                    className={cn(
                      'absolute left-[0px] right-[0px] top-0 h-[3px] animate-to-top bg-primary',
                      tab.isPrimitiveType === false && 'bg-panel-dark dark:bg-panel-light'
                    )}
                  ></span>
                )}
                <p className='peer w-full overflow-hidden text-ellipsis text-center'>{tab.name}</p>
                {tab.isPrimitiveType === false && tab.type_id === recordId && (
                  <Button
                    rounded
                    className={cn(
                      'aspect-square h-6 w-0 rounded-full p-0 opacity-0',
                      'hover:w-6 hover:opacity-100 peer-hover:w-6 peer-hover:opacity-100'
                    )}
                    onClick={() => {
                      removeRecordTab(recordId);
                    }}
                  >
                    <X size={'.9rem'}></X>
                  </Button>
                )}
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
                    to={
                      tab.isPrimitiveType === false
                        ? `/${companyName}/record/${tab.type_id}`
                        : `/${companyName}/section/${domainName}/${tab.type_id}`
                    }
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
        <Pencil width='1.2rem' height='1.2rem' />
      </Button>
      <TabLayoutModal
        openingTabId={id}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        layoutName={domainName}
      ></TabLayoutModal>
    </nav>
  );
};
export default RecordTabs;
