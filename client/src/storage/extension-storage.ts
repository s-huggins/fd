export class ExtensionStorage {
  public static get<T>(key: string): Promise<T> {
    const promise = new Promise<T>((resolve, reject) => {
      chrome.storage.sync.get([key], response => {
        resolve(response[key]);
      });
    });
    return promise;
  }

  public static set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve();
      });
    });
  }

  public static async setIfNotExists(key: string, initialValue: any): Promise<void> {
    const value = await this.get(key);
    if (value === undefined) {
      await this.set(key, initialValue);
    }
  }
}
