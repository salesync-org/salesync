import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/utils';

interface Props {
  name: string;
  path: string;
  icon?: string;
  target?: string;
}

const NavItem = ({ name, path, target = '_self' }: Props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'rounded-md px-4 py-2 font-bold transition-all duration-200 hover:scale-105 hover:bg-blue-500 hover:text-white hover:shadow-lg',
          isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-blue-600 '
        )
      }
      to={path}
      target={target}
    >
      {name}
    </NavLink>
  );
};
export default NavItem;
