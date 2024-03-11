import { SystemThemeEnum, ThemeEnum } from "@/constants/enum";

export function systemThemeToThemeEnum(theme: SystemThemeEnum): ThemeEnum {
  return theme === SystemThemeEnum.LIGHT ? ThemeEnum.LIGHT : ThemeEnum.DARK;
}