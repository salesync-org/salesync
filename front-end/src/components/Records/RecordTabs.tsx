import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { Button, DropDownList, Icon, Tooltip } from '../ui';
import { Pencil } from '@/components/SaleSyncIcons';
import TabLayoutModal from '../TabLayoutModal/TabLayoutModal';
import useType from '@/hooks/type-service/useType';
import { PinIcon, X } from 'lucide-react';
// import { LayoutOrder, Type } from '@/type';

interface RecordTabsProps {
  tabs: LayoutType[];
  // setTabs: React.Dispatch<React.SetStateAction<{ title: string; href: string }[]>>;
  name: string;
  currentTab?: string;
  domainName?: string;
}

const RecordTabs = ({ tabs = [], name, domainName = 'sales', currentTab }: RecordTabsProps) => {
  const { typeId = '' } = useParams();
  const { types = [] } = useType();
  const companyName = useParams().companyName as string;
  const { recordId } = useParams();
  const [isSwap, setIsSwap] = useState(false);
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateUserSettings, user, isLoading, setUser } = useAuth();
  const tabWidth = 100;
  let visibleTabs = Math.max(0, Math.floor(windowWidth / tabWidth) - 3);
  const tabListShown = tabs.slice(0, visibleTabs);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (user && isSwap) {
        updateUserSettings(companyName, user);
        setIsSwap(false);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [companyName, updateUserSettings, isSwap, user, typeId]);

  useEffect(() => {
    if (tabs.find((tab) => tab.type_id === recordId) === undefined) {
      addTypeToList(recordId);
    }
  }, [recordId]);

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
  const saleLayoutIndex = layoutOrders.findIndex(
    (layoutOrder: LayoutOrder) => layoutOrder.name.toLowerCase() === domainName.toLowerCase()
  );

  const updateUserAsync = async (newUser: User) => {
    await updateUserSettings(companyName, newUser);
  };

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

  const addTypeToList = async (newTypeId: string | null | undefined) => {
    if (!newTypeId) {
      return;
    }
    const newType = types.find((type) => type.id === newTypeId);
    let newTypeLayout: LayoutType;

    if (newType === undefined) {
      if (newTypeId) {
        newTypeLayout = {
          type_id: newTypeId,
          name: currentTab ?? `Record${newTypeId.slice(0, 2)}`,
          isPrimitiveType: false,
          saved: false
        };
        if (tabs.find((tab) => tab.isPrimitiveType == false && tab.type_id === newTypeId)) {
          return;
        }
      } else {
        return;
      }
    } else {
      newTypeLayout = {
        type_id: newType?.id ?? '',
        name: newType?.name ?? '',
        isPrimitiveType: false,
        saved: false
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

  const removeRecordTab = async (newTypeId: string) => {
    const newLayoutOrders = layoutOrders.map((layoutOrder) => {
      if (layoutOrder.name.toLowerCase() === domainName) {
        return {
          ...layoutOrder,
          types: layoutOrder.types.filter((type) => type.type_id !== newTypeId)
        };
      }
      return layoutOrder;
    });
    if (newTypeId === recordId || newTypeId === typeId) {
      navigate(`/${companyName}/section/${domainName}/${tabs[0].type_id}`);
    }
    const newUser = { ...user, settings: { ...user.settings, layout_order: newLayoutOrders } };
    setUser(newUser);

    updateUserAsync(newUser);
  };

  const pinRecordTab = async (newTypeId: string) => {
    const newLayoutOrders = layoutOrders.map((layoutOrder) => {
      if (layoutOrder.name.toLowerCase() === domainName) {
        const newTypes = layoutOrder.types.map((type) => {
          if (type.type_id === newTypeId) {
            return { ...type, isPrimitiveType: false, saved: true };
          }
          return type;
        });
        return { ...layoutOrder, types: newTypes };
      }
      return layoutOrder;
    });
    const newUser = { ...user, settings: { ...user.settings, layout_order: newLayoutOrders } };
    setUser(newUser);

    updateUserAsync(newUser);
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
                    ? `/${companyName}/section/${domainName}/record/${tab.type_id}`
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
                    'peer flex h-full cursor-pointer items-center gap-1 truncate border-t-[3px] border-transparent bg-clip-border px-3 py-2 transition-all duration-100 ease-in-out',
                    (isActive || tab.name === currentTab) && 'bg-secondary/40 dark:bg-secondary-dark/40',
                    isActive && tab.isPrimitiveType === false && 'border-0 bg-panel-dark/5 dark:bg-panel-light/5',
                    'hover:border-b-2 hover:border-b-primary hover:bg-secondary/30 focus:border-b-0 active:border-b-0 dark:hover:bg-secondary-dark/30',
                    tab.isPrimitiveType === false &&
                      'hover:border-b-panel-dark hover:bg-panel-dark/10  dark:hover:border-b-panel-light dark:hover:bg-panel-light/20',
                    `${name}-tab`
                  )
                }
              >
                {((tab.isPrimitiveType != false && tab.type_id === typeId) ||
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
                {tab.isPrimitiveType === false && (
                  <div className='group absolute bottom-2 right-2 top-3 flex w-full justify-end align-middle'>
                    {!tab.saved && (
                      <Button
                        rounded
                        className={cn(
                          'aspect-square h-6 rounded-full p-0 opacity-0 group-hover:opacity-100',
                          'hover:w-6 hover:opacity-100 peer-hover:w-6 '
                        )}
                        onClick={async (e) => {
                          e.preventDefault();
                          await pinRecordTab(tab.type_id);
                        }}
                      >
                        <PinIcon size={'.9rem'}></PinIcon>
                      </Button>
                    )}
                    <Button
                      rounded
                      className={cn(
                        'aspect-square h-6 rounded-full p-0  opacity-0 group-hover:opacity-100',
                        'hover:w-6 hover:opacity-100 peer-hover:w-6'
                      )}
                      onClick={async (e) => {
                        e.preventDefault();
                        await removeRecordTab(tab.type_id);
                      }}
                    >
                      <X size={'.9rem'}></X>
                    </Button>
                  </div>
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
                        ? `/${companyName}/section/${domainName}/record/${tab.type_id}`
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
        data-tooltip-id='edit-layout'
        data-tooltip-content='Edit Tabs'
        // data-tooltip-place="top"
        className='absolute right-0 top-[1px] aspect-square rounded-full border-0 bg-transparent p-0 dark:bg-transparent'
        onClick={() => {
          setIsEditModalOpen(true);
        }}
      >
        <Pencil width='1.2rem' height='1.2rem' />
      </Button>
      <Tooltip id='edit-layout' />
      <TabLayoutModal
        openingTabId={recordId ?? typeId}
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
