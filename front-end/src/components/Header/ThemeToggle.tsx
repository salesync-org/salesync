import useTheme from '@/hooks/useTheme';
import { useState } from 'react';
import {Button, Icon, Item, DropDownList} from '@/components/ui';
import { ThemeEnum } from '@/constants/enum';

const ThemeToggle = () => {
  const [theme, setTheme, isSystemTheme] = useTheme();
  const [isThemeMenuOpen, setThemeMenuOpen] = useState(false);
  return (
    <div>
      <Button
        rounded='icon'
        className='h-10 w-10'
        intent='normal'
        onClick={() => {
          setThemeMenuOpen(!isThemeMenuOpen);
        }}
      >
        {theme == ThemeEnum.LIGHT ? <Icon name='light_mode' size='1rem' /> : <Icon name='dark_mode' size='1rem' />}
      </Button>
      <DropDownList open={isThemeMenuOpen}onClose={()=>{setThemeMenuOpen(false);}} className='right-[.25rem] top-[3rem] mt-0 w-80 py-2' divide={false}>
        <Item
          className='py-1'
          icon={<Icon name='light_mode' size='2rem' />}
          title='Light'
          selected={theme === ThemeEnum.LIGHT && !isSystemTheme}
          onClick={() => {
            setTheme(ThemeEnum.LIGHT);
          }}
        />
        <Item
          className='py-1'
          icon={<Icon name='dark_mode' size='2rem' />}
          title='Dark'
          selected={theme === ThemeEnum.DARK && !isSystemTheme}
          onClick={() => {
            setTheme(ThemeEnum.DARK);
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
    </div>
  );
};

export default ThemeToggle;
