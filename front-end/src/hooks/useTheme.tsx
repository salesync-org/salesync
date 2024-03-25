import { ThemeEnum } from '@/constants/enum';
import { useEffect, useState } from 'react';
import useSystemTheme from './useSystemTheme';

const useTheme = (): [theme: ThemeEnum, toggleTheme: (newTheme: ThemeEnum | null) => void, isSystemTheme: boolean] => {
  const systemTheme = useSystemTheme();
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.LIGHT);
  const [isSystemTheme, setIsSystemTheme] = useState(localStorage.getItem('theme') === null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === ThemeEnum.LIGHT || savedTheme === ThemeEnum.DARK)) {
      triggerThemeChange(savedTheme);
      setIsSystemTheme(false);
    } else {
      setIsSystemTheme(true);
      triggerThemeChange(systemTheme);
    }
  }, []);

  const triggerThemeChange = (newTheme: ThemeEnum) => {
    setTheme(newTheme);
    if (newTheme == ThemeEnum.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (isSystemTheme) {
      triggerThemeChange(systemTheme);
    }
  }, [systemTheme]);

  const toggleTheme = (newTheme: ThemeEnum | null) => {
    if (newTheme && (newTheme === ThemeEnum.LIGHT || newTheme === ThemeEnum.DARK)) {
      triggerThemeChange(newTheme);
      localStorage.setItem('theme', newTheme);
      setIsSystemTheme(false);
    } else {
      localStorage.removeItem('theme');
      triggerThemeChange(systemTheme);
      setIsSystemTheme(true);
    }
  };

  return [theme, toggleTheme, isSystemTheme];
};

export default useTheme;
