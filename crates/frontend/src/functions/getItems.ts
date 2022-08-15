import { Item, Result } from "../types/SearchApiResult";

const URL =
  "https://api.stackexchange.com/2.3/search?order=desc&sort=relevance&site=stackoverflow&intitle=";

export default async function (searchTerm: string): Promise<Item[]> {
  if (searchTerm === "") return [];
  try {
    return ((await (await fetch(URL + encodeURI(searchTerm))).json()) as Result)
      .items;
  } catch (err) {
    return [];
  }
}
