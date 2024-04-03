import { cn } from '@/utils/utils';
import { NavLink, useParams } from 'react-router-dom';
import Icon from '../ui/Icon/Icon';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';

type AsideItem = {
  href: string;
  name: string;
  icon: string;
  types: Type[];
  active?: boolean;
  className?: string;
};

const AsideNav = () => {
  const [currentAsideItems, setCurrentAsideItems] = useState<AsideItem[]>([]);

  const { user } = useAuth();
  useEffect(() => {
    const layoutOrders = user?.settings.layout_order;
    if (layoutOrders) {
      const mapAsideItems = layoutOrders.map((layoutOrder) => {
        return {
          ...layoutOrder,
          href: `/${layoutOrder.name.toLowerCase()}`
        };
      });

      setCurrentAsideItems(mapAsideItems);
    }
  }, [user]);

  return (
    <aside className='fixed z-50 grid min-h-dvh w-[76px] justify-center bg-[#014486] text-white'>
      <nav className='p-1'>
        <ul className='flex flex-col gap-1'>
          {currentAsideItems.map((item, index) => (
            <li key={item.name} value={index}>
              <AsideItem
                {...item}
                currentAsideItems={currentAsideItems}
                setCurrentAsideItems={setCurrentAsideItems}
                selfIndex={index}
              />
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
  name,
  className,
  currentAsideItems,
  setCurrentAsideItems,
  selfIndex
}: {
  icon: string;
  href: string;
  name: string;
  active?: boolean;
  className?: string;
  currentAsideItems: AsideItem[];
  setCurrentAsideItems: React.Dispatch<React.SetStateAction<AsideItem[]>>;
  selfIndex: number;
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.currentTarget.classList.add('dragging');
    e.currentTarget.classList.add('rotate-12');
  };

  const handleDragOver = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('.dragging') as HTMLAnchorElement;
    const siblings = target.parentElement?.parentElement?.children;

    if (!siblings) return;

    const sibling = [...siblings].find((sibling) => {
      return e.clientY < sibling.getBoundingClientRect().bottom;
    });

    if (sibling) {
      const from = selfIndex;
      const to = Number(sibling.getAttribute('value'));
      const newTabs = [...currentAsideItems];
      newTabs.splice(to, 0, newTabs.splice(from, 1)[0]);
      setCurrentAsideItems(newTabs);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.currentTarget.classList.remove('rotate-12');
    e.currentTarget.classList.remove('dragging');

    localStorage.setItem('asideItems', JSON.stringify(currentAsideItems));
  };

  const { companyName = '' } = useParams();

  return (
    <NavLink
      to={`/${companyName}${href}`}
      title={name}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
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
      <span className='mt-1 w-full truncate px-[2px] text-[10px] leading-4'>{name}</span>
    </NavLink>
  );
};

export default AsideNav;
