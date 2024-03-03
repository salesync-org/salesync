import useTheme from '@/hooks/useTheme';
import { useState } from 'react';
import Button from 'ui/Button/Button';
import DropDownList from 'ui/DropDown/DropDownList';
import Icon from 'ui/Icon/Icon';
import Item from 'ui/Item/Item';

const ThemeToggle = () => {
  const [theme, setTheme, isSystemTheme] = useTheme();
  const [isThemeMenuOpen, setThemeMenuOpen] = useState(false);
  return (
    <>
      <Button
        rounded='icon'
        className='h-10 w-10'
        intent='normal'
        onClick={() => {
          setThemeMenuOpen(!isThemeMenuOpen);
        }}
      >
        {theme == 'light' ? <Icon name='light_mode' size='1rem' /> : <Icon name='dark_mode' size='1rem' />}
      </Button>
      <DropDownList open={isThemeMenuOpen} className='right-[.25rem] top-[3rem] mt-0 w-80 py-2' divide={false}>
        <Item
          className='py-1'
          icon={<Icon name='light_mode' size='2rem' />}
          title='Light'
          selected={theme === 'light' && !isSystemTheme}
          onClick={() => {
            setTheme('light');
          }}
        />
        <Item
          className='py-1'
          icon={<Icon name='dark_mode' size='2rem' />}
          title='Dark'
          selected={theme === 'dark' && !isSystemTheme}
          onClick={() => {
            setTheme('dark');
          }}
        />
        <Item
          className='py-1'
          icon={<Icon name='contrast' size='2rem' />}
          title='System Default'
          selected={isSystemTheme}
          onClick={() => {
            setTheme(null);
          }}
        />
      </DropDownList>
    </>
  );
};

export default ThemeToggle;
