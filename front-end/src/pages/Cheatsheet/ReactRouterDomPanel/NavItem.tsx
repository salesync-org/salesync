import { NavLink } from 'react-router-dom';
import buttonVariants from 'ui/Button/ButtonProps';

interface Props {
  name: string;
  path: string;
  icon?: string;
  target?: string;
}

const NavItem = ({ name, path, target = '_self' }: Props) => {
  return (
    <NavLink
      className={({ isActive }) => buttonVariants({ intent: isActive ? 'primary' : 'normal' })}
      to={path}
      target={target}
    >
      {name}
    </NavLink>
  );
};
export default NavItem;
