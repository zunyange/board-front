import { DefaultValue } from "recoil";

export const localStorageEffect =
  (key, storageType) =>
  ({ setSelf, onSet }) => {
    if (typeof window == "undefined") return;
    const storage = storageType === "local" ? localStorage : sessionStorage;

    setSelf(() => {
      if (!storage.getItem(key) || storage.getItem(key) === null) {
        return new DefaultValue();
      } else {
        return JSON.parse(storage.getItem(key) || "");
      }
    });

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
