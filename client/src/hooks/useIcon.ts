import { AppThemeEnum } from '../context/app-theme.enum';
import { useExtensionContext } from '../context/extension-context';
import { useAsset } from './useAsset';

export type IconFile = 'icon-dark.png' | 'icon-light.png';
export const ICON_DARK_FILE: IconFile = 'icon-dark.png';
export const ICON_LIGHT_FILE: IconFile = 'icon-light.png';
export const iconLookup: Record<string, IconFile> = {
  [AppThemeEnum.Dark]: ICON_DARK_FILE,
  [AppThemeEnum.Light]: ICON_LIGHT_FILE
};

/**
 * @returns the resolved url for the library icon
 */
export const useLibraryIconUrl = () => {
  const { theme } = useExtensionContext();
  const { getImage } = useAsset();
  const iconFile: IconFile = iconLookup[theme];
  const iconURL: string = getImage(iconFile);
  return iconURL;
};
