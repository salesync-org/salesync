import Icon from '@/components/ui/Icon/Icon';
import { cn } from '@/utils/utils';
import { Link } from 'react-router-dom';

const RecordsLayout = () => {
  return (
    <div className='min-h-dvh'>
      <aside className='grid min-h-dvh w-[76px] justify-center bg-[#014486] text-white'>
        <nav className='p-1'>
          <ul className='flex flex-col gap-1'>
            <li>
              <AsideItem icon='home' href='#' title='Home' />
            </li>
            <li>
              <AsideItem icon='monitoring' href='#' title='Sales' active />
            </li>
            <li>
              <AsideItem icon='ecg_heart' href='#' title='Services' />
            </li>
            <li>
              <AsideItem icon='mail' href='#' title='Outreach' />
            </li>
            <li>
              <AsideItem icon='shopping_cart' href='#' title='Commerce' />
            </li>
            <li>
              <AsideItem icon='domain' href='#' title='Your account' />
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

const AsideItem = ({
  icon,
  href,
  title,
  active = false,
  className
}: {
  icon: string;
  href: string;
  title: string;
  active?: boolean;
  className?: string;
}) => {
  return (
    <Link
      to={href}
      title={title}
      className={cn(
        'flex h-16 w-16 flex-col items-center justify-center rounded-[8px]  text-center text-sm leading-5',
        'hover:rounded-[8px] hover:border-[2px] hover:border-white/50',
        active && 'border-[2px] border-white',
        className
      )}
    >
      <Icon name={icon} size='32px' />
      <span className='mt-1 w-full truncate px-[2px] text-[10px] leading-4'>{title}</span>
    </Link>
  );
};
export default RecordsLayout;
