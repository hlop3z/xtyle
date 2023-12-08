/**
 * Object containing methods to convert strings to different formats.
 */
import {
  stringSlugify,
  stringLowerCase,
  stringUpperCase,
  stringTitleCase,
  stringPascalCase,
  stringCamelCase,
} from "../stringTo/index.tsx";

const stringTo = {
  slug: stringSlugify,
  lower: stringLowerCase,
  upper: stringUpperCase,
  title: stringTitleCase,
  pascal: stringPascalCase,
  camel: stringCamelCase,
  cut: (text, size) => text.substring(0, size),
};

export default function Slots(props) {
  const { slug, lower, upper, title, filter, cut, ellipsis } = props;
  const originalValue = props.value || "";
  let value = props.value || "";
  if (slug) return stringTo.slug(value);
  else if (lower) return stringTo.lower(value);
  else if (upper) return stringTo.upper(value);
  else if (title) return stringTo.title(value);
  if (filter) value = filter(value);
  if (cut) {
    value = stringTo.cut(value, cut);
    if (ellipsis && originalValue.length > cut) {
      if (ellipsis === true) {
        value += "...";
      } else {
        value += ellipsis;
      }
    }
  }
  return value;
}
