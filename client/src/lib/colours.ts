import tailwindConfig from '../../tailwind.config';

/**
 * Config class to dynamically obtain colours registered with Tailwind
 */
export class Colours {
  public static colors: Record<string, string> = { ...tailwindConfig.theme.extend.colors };
}
