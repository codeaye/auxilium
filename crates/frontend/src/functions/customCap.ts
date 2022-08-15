import unescape from "lodash/unescape";

export default function (text: string): string {
  return unescape(text[0].toUpperCase() + text.slice(1));
}
