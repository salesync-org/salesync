import useTheme from '@/hooks/useTheme';
import { useState } from 'react';
import { Button, Icon, Item, DropDownList, DropDownItem } from '@/components/ui';
import { Sun, Moon, Eclipse } from 'lucide-react';
import { ThemeEnum } from '@/constants/enum';
import { cn } from '@/utils/utils';

const ThemeToggle = () => {
  const [theme, setTheme, isSystemTheme] = useTheme();
  const [isThemeMenuOpen, setThemeMenuOpen] = useState(false);
  return (
    <div>
      <Button
        rounded='icon'
        className='h-10 w-10 p-0'
        intent={isThemeMenuOpen ? 'primary' : 'normal'}
        onClick={() => {
          setThemeMenuOpen(!isThemeMenuOpen);
        }}
      >
        {theme == ThemeEnum.LIGHT ? (
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
            icon={<Eclipse strokeWidth={'2px'} className='size-[1.5rem]' />}
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
