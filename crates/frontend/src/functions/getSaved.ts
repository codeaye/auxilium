import { Store } from "tauri-plugin-store-api";
import SavedData from "../types/SavedData";

export default async function (store: Store) {
  const keys = await getKeys(
    ["darkMode", "denseMode", "noTagsMode"],
    ["true", "false", "false"],
    store
  );
  return keys as unknown as SavedData;
}

async function getKeys(keys: string[], defaults: string[], store: Store) {
  let data: { [key: string]: boolean } = {};
  let i = 0;
  for (const key of keys) {
    let val = await store.get(key);
    if (val == null) {
      val = defaults[i];
      await store.set(key, defaults[i]);
    }
    data[key] = stringToBool(val as string) as boolean;
    i++;
  }
  store.save();
  return data;
}

function stringToBool(str: string | boolean): boolean {
  if (typeof str === "string") {
    switch (str) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return true;
    }
  }
  return str;
}
