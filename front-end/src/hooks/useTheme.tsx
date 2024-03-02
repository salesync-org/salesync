import { useState, useEffect } from 'react';
import useSystemTheme from './useSystemTheme';

const useTheme = (): [ theme: Theme, toggleTheme: (newTheme: Theme | null) => void, isSystemTheme : boolean ] => {  
  const systemTheme = useSystemTheme();
  const [theme, setTheme] = useState<Theme>(systemTheme);
  const [isSystemTheme, setIsSystemTheme] = useState(localStorage.getItem('theme') === null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    console.log('theme from localStorage: ' + savedTheme + ' and system theme: ' + systemTheme);
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      triggerThemeChange(savedTheme);
      setIsSystemTheme(false);
    } else {
      console.log(' so set theme to system theme.');
      setIsSystemTheme(true);
      triggerThemeChange(systemTheme);
    }
  }, []);

  const triggerThemeChange = (newTheme : Theme) => {
    setTheme(newTheme);
    if (newTheme == 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  useEffect(() => {
    if (isSystemTheme) {
      triggerThemeChange(systemTheme);
    }
  }, [systemTheme]);


  const toggleTheme = (newTheme: Theme | null) => {
    if (newTheme && (newTheme === 'light' || newTheme === 'dark')) {
      triggerThemeChange(newTheme);
      localStorage.setItem('theme', newTheme);
      setIsSystemTheme(false);
    } else {
      localStorage.removeItem('theme');
      triggerThemeChange(systemTheme);
      setIsSystemTheme(true);
    }
  };

  return [ theme, toggleTheme, isSystemTheme ];
};

export default useTheme;