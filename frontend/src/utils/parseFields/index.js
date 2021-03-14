function getType(value, key) {
  if (Array.isArray(value)) return "array";

  if (key === "genres") return "array";

  if (value === null) return "string";

  return typeof value;
}

export default function parseFields(item) {
  const entries = Object.entries(item);

  return entries.map(([key, value]) => ({
    name: key,
    value: value,
    type: getType(value, key),
    readonly: key === "id",
  }));
}
