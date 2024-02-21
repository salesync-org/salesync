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
                    'px-4 py-2 rounded-md font-bold transition-all duration-200 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105',
                    isActive ? 'bg-blue-500 text-white' : 'text-blue-600 bg-gray-100 '
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
