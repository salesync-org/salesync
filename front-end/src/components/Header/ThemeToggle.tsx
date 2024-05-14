import { Button, DropDownItem, DropDownList, Item } from '@/components/ui';
import { ThemeEnum } from '@/constants/enum';
import useTheme from '@/hooks/useTheme';
import { cn } from '@/utils/utils';
import { SystemTheme, Moon, Sun } from '@/components/SaleSyncIcons';
import { useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme, isSystemTheme] = useTheme();
  const [isThemeMenuOpen, setThemeMenuOpen] = useState(false);
  return (
    <div>
      <Button
        rounded='icon'
        className='h-10 w-10 border-text/10 p-0'
        intent={isThemeMenuOpen ? 'primary' : 'normal'}
        onClick={() => {
          setThemeMenuOpen(!isThemeMenuOpen);
        }}
      >
        {isSystemTheme ? (
          <SystemTheme className={cn('size-[1.5rem]', isThemeMenuOpen && 'text-white')} />
        ) : theme == ThemeEnum.LIGHT ? (
          <Sun strokeWidth={'2px'} className={cn('size-[1.5rem]', isThemeMenuOpen && 'text-white')} />
        ) : (
          <Moon strokeWidth={'2px'} className={cn('size-[1.5rem]', isThemeMenuOpen && 'text-white')} />
        )}
      </Button>
      <DropDownList
        open={isThemeMenuOpen}
        onClose={() => {
          setThemeMenuOpen(false);
        }}
        className='right-[.25rem] top-[3rem] mt-0 w-80 py-2'
        divide={false}
      >
        <DropDownItem title='Light' value='Light'>
          <Item
            icon={<Sun strokeWidth={'2px'} className='size-[1.5rem]' />}
            title='Light'
            selected={theme === ThemeEnum.LIGHT && !isSystemTheme}
            onClick={() => {
              setTheme(ThemeEnum.LIGHT);
            }}
          />
        </DropDownItem>
        <DropDownItem title='Dark' value='Dark'>
          <Item
            icon={<Moon strokeWidth={'2px'} className='size-[1.5rem]' />}
            title='Dark'
            selected={theme === ThemeEnum.DARK && !isSystemTheme}
            onClick={() => {
              setTheme(ThemeEnum.DARK);
            }}
          />
        </DropDownItem>
        <DropDownItem title='System Default' value='System Default'>
          <Item
            icon={<SystemTheme strokeWidth={'2px'} className='size-[1.5rem]' />}
            title='System Default'
            selected={isSystemTheme}
            onClick={() => {
              setTheme(null);
            }}
          />
        </DropDownItem>
      </DropDownList>
    </div>
  );
};

export default ThemeToggle;
