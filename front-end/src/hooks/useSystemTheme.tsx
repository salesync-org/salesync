import { SYSTEM_DARK_CONDITION } from '@/constants/constant';
import { SystemThemeEnum } from '@/constants/enum';
import { systemThemeToThemeEnum } from '@/utils/mapper';
import { useEffect, useState } from 'react';



const getSystemTheme = (): SystemThemeEnum => {
  if (window.matchMedia && window.matchMedia(SYSTEM_DARK_CONDITION).matches) {
    return SystemThemeEnum.DARK;
  }
  return SystemThemeEnum.LIGHT;
};

const useSystemTheme = () => {

  const [systemTheme, setSystemTheme] = useState<SystemThemeEnum>(() => getSystemTheme());
  
  useEffect(() => {
    const mediaQueryList = window.matchMedia(SYSTEM_DARK_CONDITION);
    const listener = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? SystemThemeEnum.DARK : SystemThemeEnum.LIGHT );
    };
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, []);

  return  systemThemeToThemeEnum(systemTheme);
};

export default useSystemTheme;
