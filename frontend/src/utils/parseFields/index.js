export default function parseFields(item) {
  const entries = Object.entries(item);

  return entries.map(([key, value]) => ({
    name: key,
    value: value,
    type: Array.isArray(value) ? "array" : typeof value,
    readonly: key === "id",
  }));
}
