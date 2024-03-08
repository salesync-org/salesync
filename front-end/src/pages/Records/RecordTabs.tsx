import Icon from '@/components/ui/Icon/Icon';
import { cn } from '@/utils/utils';
import { NavLink, useLocation } from 'react-router-dom';

interface RecordTabsProps {
  tabs: { title: string; href: string }[];
  setTabs: React.Dispatch<React.SetStateAction<{ title: string; href: string }[]>>;
  name: string;
}

const RecordTabs = ({ tabs, setTabs, name }: RecordTabsProps) => {
  const location = useLocation();

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
      setTabs(newTabs);
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
    <nav>
      <ul className={`${name}-tabs flex`}>
        {tabs.map((tab, index) => {
          return (
            <li
              key={tab.title}
              className={`-translate-x-[${index * 2}%] relative text-sm leading-5`}
              value={index}
              style={{
                transition: 'all 0.3s ease',
                transform: `translateX(${index * 2}%)`
              }}
            >
              <NavLink
                to={tab.href}
                data-index={index}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                className={({ isActive }) =>
                  cn(
                    'flex cursor-pointer items-center gap-1 truncate border-t-[3px] border-transparent bg-clip-border px-3 py-2 transition-all duration-100 ease-in-out hover:bg-[#0070d2]/10',
                    isActive && 'bg-[#0070d2]/10',
                    'hover:bg-[#0070d2]/10',
                    `${name}-tab`
                  )
                }
              >
                {tab.href.includes(location.pathname.split('/').pop() ?? '') && (
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
