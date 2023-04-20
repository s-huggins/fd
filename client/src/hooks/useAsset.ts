export const useAsset = () => {
  return {
    getImage: (file: string) => chrome.runtime.getURL(`assets/images/${file}`)
  };
};
