/**
 * Hook to obtain a function that can resolve asset urls for the extension.
 */
export const useAsset = () => {
  return {
    getImage: (file: string) => chrome.runtime.getURL(`assets/images/${file}`)
  };
};
