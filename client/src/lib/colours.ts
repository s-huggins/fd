import tailwindConfig from '../../tailwind.config';

export class Colours {
  public static colors: Record<string, string> = { ...tailwindConfig.theme.extend.colors };
}
