import { Link } from 'react-router-dom';
import Button from '../ui/Button/Button';
import Icon from '../ui/Icon/Icon';
import { cn } from '@/utils/utils';

interface SettingRowProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

const SettingRow = ({ icon, title, description, href }: SettingRowProps) => {
  return (
    <li>
      <Link
        to={href}
        className={cn('grid grid-cols-12 items-center gap-2 p-1 transition-all', 'hover:scale-[1.02] hover:shadow-sm')}
      >
        <Button rounded='icon' className='col-span-1'>
          <Icon name={icon} />
        </Button>
        <h3 className='col-span-3 truncate text-sm font-medium leading-4'>{title}</h3>
        <span className='col-span-7 truncate text-sm leading-4'>{description}</span>
        <Icon name='chevron_right' className='col-span-1' />
      </Link>
    </li>
  );
};
export default SettingRow;
